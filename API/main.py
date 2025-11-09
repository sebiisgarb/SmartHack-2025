from http.client import HTTPException
from fastapi.middleware.cors import CORSMiddleware

import openai
from fastapi import FastAPI, UploadFile, File, Form, Depends
from gradio_client import Client, handle_file
import tempfile
import os
from dotenv import load_dotenv
from openai import OpenAI
import json
from fastapi.responses import JSONResponse
from sqlalchemy.sql.annotation import Annotated

from database import engine, SessionLocal
from sqlalchemy.orm import Session
import models

load_dotenv()

app = FastAPI(
    title="VoiceLearn+ Backend API",
    description="Wrapper FastAPI pentru Space-ul Hugging Face radu1633/learning-STT-RO",
    version="1.0.0",
)

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)
models.Base.metadata.create_all(bind=engine)

client = Client("radu1633/learning-STT-RO")
openai_client = OpenAI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/sentences_stt")
async def get_sentences(db: Session = Depends(get_db)):
    result = db.query(models.Sentence_stt).all()
    if not result:
        raise 'Nothing Found'
    return result

@app.get("/sentences_tts")
async def get_sentences(db: Session = Depends(get_db)):
    result = db.query(models.Sentence_tts).all()
    if not result:
        raise 'Nothing Found'
    return result

@app.post("/analyze_audio")
async def analyze_audio(
    file: UploadFile = File(..., description="Fișierul audio (mp3/mp4/wav) al elevului"),
    target_text: str = Form(..., description="Textul corect (țintă)")
):

    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        result = client.predict(
            input_path=handle_file(tmp_path),
            target_text=target_text,
            api_name="/analyze_audio_en"
        )

        os.remove(tmp_path)

        return {
            "target_text": result[0],
            "raw_text": result[1],
            "score": result[2]
        }

    except Exception as e:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        return {"error": str(e)}

@app.post("/teacher_report")
async def teacher_report(
    target_text: str = Form(...),
    raw_text: str = Form(...),
    score: float = Form(...)
):
    prompt = f"""
    Ești un profesor de limba română pentru clasele primare, care oferă feedback detaliat
    despre pronunția și înțelegerea elevilor.

    Ai următoarele informații:
    - Text corect: "{target_text}"
    - Text spus de elev: "{raw_text}"
    - Scor de pronunție: {score}%

    Analizează diferențele și întoarce un raport structurat în JSON cu câmpurile:
    {{
      "summary": "rezumat general al performanței elevului",
      "errors": [
        {{
          "expected": "cuvânt corect",
          "spoken": "cum a spus elevul",
          "type": "tipul erorii (fonetică, ortografică, omisiune etc.)",
          "tip": "descriere scurtă a confuziei fonetice"
        }}
      ],
      "suggested_exercises": "propune niște exerciții de fonetică sub formă de subpuncte (1., 2., ...) pentru a îmbunătății pronunția elevului având în vedere cuvintele greșite"
    }}

    Dacă elevul nu a făcut greșeli, returnează doar:
    {{
      "summary": "Elevul a pronunțat totul corect. Poate trece la un nivel mai dificil."
    }}
    """

    ai_response = openai_client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": ("Ești un profesor expert în fonetică și didactică, care oferă feedback clar pentru cadrele didactice."
                                           "Răspunzi exclusiv în limba română corectă. "
                                           "Respecți structura JSON cerută. Nu adaugi text în afara JSON-ului."
                                           ),
             },
            {"role": "user", "content": prompt},
        ],
        temperature=0.5,
        response_format={"type": "json_object"},
    )

    raw_report = ai_response.choices[0].message.content
    try:
        report_data = json.loads(raw_report)
    except json.JSONDecodeError:
        return {"error": "Răspunsul AI nu a putut fi interpretat ca JSON", "raw": raw_report}

    formatted_report = json.dumps(report_data, indent=2, ensure_ascii=False)
    print(formatted_report)

    return JSONResponse(content=report_data, media_type="application/json")

@app.get("/health")
def health():
    return {"status": "ok"}

from fastapi import Body

@app.post("/submit_results")
async def submit_results(payload: dict = Body(...)):
    """
    Receives all exercise results (3 STT + 3 TTS) for a student,
    analyzes them with GPT, and returns a summarized teacher report.
    """
    try:
        student_id = payload.get("student_id", "unknown_student")
        results = payload.get("results", [])

        if not results or len(results) < 6:
            return JSONResponse(
                content={"error": "You must submit all 6 exercises (3 STT + 3 TTS)."},
                status_code=400
            )

        # Build a text summary for GPT
        text_summary = f"Performance report for student {student_id}:\n"
        for i, r in enumerate(results, 1):
            if r["type"] == "stt":
                text_summary += (
                    f"\nExercise {i} (Read Aloud):\n"
                    f" - Target sentence: {r['sentence']}\n"
                    f" - Spoken text: {r.get('spokenText', '')}\n"
                    f" - Score: {r['score']}%\n"
                )
            elif r["type"] == "tts":
                text_summary += (
                    f"\nExercise {i} (Listen & Write):\n"
                    f" - Target sentence: {r['sentence']}\n"
                    f" - Written text: {r.get('writtenText', '')}\n"
                    f" - Score: {r['score']}%\n"
                )

        # GPT prompt
        prompt = f"""
You are an English teacher for young learners.
You are analyzing a student's results from reading aloud (STT) and listening/writing (TTS) exercises.

Here are the detailed results:
{text_summary}

Create a concise JSON report with this exact structure:

{{
  "summary": "general performance summary",
  "global_score": "average of all scores (%)",
  "errors_summary": "brief explanation of the most common errors (phonetic, spelling, omissions, etc.)",
  "recommendations": "specific short exercises or activities to improve performance"
}}

Write everything in clear, natural English.
Do not include any text outside the JSON.
        """

        ai_response = openai_client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": (
                    "You are an expert English teacher who provides structured feedback for young learners. "
                    "Always respond strictly in JSON format as requested."
                )},
                {"role": "user", "content": prompt},
            ],
            temperature=0.6,
            response_format={"type": "json_object"},
        )

        raw_report = ai_response.choices[0].message.content
        report = json.loads(raw_report)

        print("📘 Teacher report generated:")
        print(json.dumps(report, indent=2, ensure_ascii=False))

        return JSONResponse(content=report)

    except Exception as e:
        print("❌ Error in /submit_results:", e)
        return JSONResponse(content={"error": str(e)}, status_code=500)

from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
import tempfile
from openai import OpenAI

openai_client = OpenAI()

@app.post("/generate_audio")
async def generate_audio_en(
    text: str = Form(..., description="Text to be spoken clearly in English")
):
    """
    Generates an English audio file (MP3) using the GPT-4o-mini-tts model.
    The text will be spoken naturally and clearly, without translations.
    """
    try:
        # Creăm fișierul audio temporar
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp_audio:
            response = openai_client.audio.speech.create(
                model="gpt-4o-mini-tts",
                voice="alloy",  # Poți încerca și 'verse', 'coral', 'luna'
                input=text,
            )
            tmp_audio.write(response.read())
            tmp_path = tmp_audio.name

        return FileResponse(
            tmp_path,
            media_type="audio/mpeg",
            filename="tts_english.mp3"
        )

    except Exception as e:
        return {"error": str(e)}

