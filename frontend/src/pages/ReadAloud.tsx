import { useState, useEffect, useRef } from "react";
import { Mic, Home, Volume2 } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { Confetti } from "../components/Confetti";
import { getFeedbackMessage } from "../utils/feedback";
import { fetchSentences_stt } from "../api/sentences";
import { analyzeAudio } from "../api/analyzeAudio";
import { ExerciseResult } from "../types";
import toast, { Toaster } from "react-hot-toast";

interface ReadAloudProps {
  onNavigate: (page: string) => void;
  onExerciseComplete: () => void;
  onExerciseResult: (result: ExerciseResult) => void;
  currentExercise: number;
  totalExercises: number;
}

export const ReadAloud = ({
  onNavigate,
  onExerciseComplete,
  onExerciseResult,
  currentExercise,
  totalExercises,
}: ReadAloudProps) => {
  const [sentence, setSentence] = useState<string>("");
  const [sentencesData, setSentencesData] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState(getFeedbackMessage(0));
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<JSX.Element | null>(
    null
  );
  const [isPlayingWord, setIsPlayingWord] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    async function loadSentences() {
      const data = await fetchSentences_stt();
      if (data) {
        setSentencesData(data);
        pickRandomSentence(data);
      }
    }
    loadSentences();
  }, []);

  const pickRandomSentence = (data: any) => {
    if (!data) return;
    const levels = Object.keys(data);
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const sentences = data[randomLevel].sentences || [data[randomLevel].text];
    const randomSentence =
      sentences[Math.floor(Math.random() * sentences.length)];
    setSentence(randomSentence);
  };

  const playWordAudio = async (word: string) => {
    try {
      setIsPlayingWord(word);
      const formData = new FormData();
      formData.append("text", word);
      const response = await fetch("http://localhost:8001/generate_audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error generating audio.");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => setIsPlayingWord(null);
      audio.play();
    } catch (err) {
      console.error("Error playing word:", err);
      setIsPlayingWord(null);
      alert("Couldn't play the word pronunciation.");
    }
  };

  const highlightDifferences = (
    expected: string,
    spoken: string
  ): JSX.Element => {
    const expectedWords = expected.toLowerCase().split(/\s+/);
    const spokenWords = spoken.toLowerCase().split(/\s+/);
    return (
      <>
        {expectedWords.map((word, index) => {
          const spokenWord = spokenWords[index] || "";
          const isDifferent = word !== spokenWord;
          return isDifferent ? (
            <button
              key={index}
              onClick={() => playWordAudio(word)}
              className="text-red-500 font-bold underline decoration-red-400 decoration-2 mx-1 hover:scale-110 transition-transform duration-200"
              disabled={isPlayingWord === word}
            >
              {spokenWord || "_"}
              {isPlayingWord === word && (
                <Volume2 className="inline w-4 h-4 ml-1 text-red-400 animate-pulse" />
              )}
            </button>
          ) : (
            <span key={index} className="text-green-700 mx-1">
              {spokenWord}
            </span>
          );
        })}
      </>
    );
  };

  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "recording.webm", {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        try {
          const result = await analyzeAudio(audioFile, sentence);
          if (result) {
            const { targetText, rawText: spokenText, score } = result;
            setRawText(spokenText);
            setAccuracy(score);
            const newFeedback = getFeedbackMessage(score);
            setFeedback(newFeedback);
            setHasResult(true);
            onExerciseResult({
              type: "stt",
              sentence: targetText,
              spokenText,
              score,
            });

            if (score < 100)
              setHighlightedText(highlightDifferences(targetText, spokenText));
            else setHighlightedText(null);
          } else {
            alert("Error: audio could not be analyzed.");
          }
        } catch (err) {
          console.error("Error during analysis:", err);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied or failed:", error);
      alert("Cannot access the microphone. Check your browser permissions.");
    }
  };

  const handleTryAgain = () => {
    if (sentencesData) pickRandomSentence(sentencesData);
    setHasResult(false);
    setIsRecording(false);
    setHighlightedText(null);
    setRawText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col items-center p-8">
      <Toaster position="top-left" reverseOrder={false} />

      {hasResult && accuracy >= 85 && <Confetti />}

      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => onNavigate("home")}
            icon={Home}
            variant="primary"
            size="small"
          >
            Home
          </Button>

          <h1 className="text-5xl font-black">
            <span className="text-red-500">R</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">a</span>
            <span className="text-green-500">d</span>&nbsp;
            <span className="text-blue-500">A</span>
            <span className="text-indigo-500">l</span>
            <span className="text-purple-500">o</span>
            <span className="text-pink-500">u</span>
            <span className="text-rose-500">d</span>
          </h1>

          <div className="w-32"></div>
        </div>

        <p className="text-center text-gray-500 font-semibold">
          Exercise {currentExercise + 1} of {totalExercises}
        </p>

        <div className="bg-white rounded-3xl p-12 shadow-2xl space-y-8">
          <div className="flex justify-center">
            <Mascot
              message={hasResult ? feedback.title : "Read this sentence aloud!"}
              emoji={hasResult ? feedback.emoji : "🐰"}
            />
          </div>

          {!hasResult && (
            <>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-2xl p-8 border-4 border-yellow-200">
                <p className="text-3xl font-bold text-gray-700 text-center leading-relaxed">
                  {sentence || "Loading sentence..."}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleRecord}
                  className={`w-24 h-24 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 ${
                    isRecording
                      ? "bg-red-500 animate-pulse scale-110"
                      : "bg-gradient-to-br from-red-500 to-red-500 hover:scale-110"
                  }`}
                >
                  <Mic className="w-10 h-10 text-white" />
                </button>
              </div>

              {isRecording && (
                <p className="text-2xl font-bold text-center text-gray-600 animate-pulse">
                  Listening...
                </p>
              )}
            </>
          )}

          {hasResult && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 border-4 border-purple-300">
                <div className="text-center space-y-4">
                  <p className="text-6xl font-black text-purple-600">
                    {accuracy}%
                  </p>
                  <p className="text-2xl font-bold text-gray-700">
                    Accuracy Score
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-200 to-orange-400 rounded-full transition-all duration-1000"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              </div>

              {accuracy < 100 && highlightedText && (
                <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200 text-center">
                  <p className="text-xl font-bold text-gray-700 mb-2">
                    Your words:
                  </p>
                  <p className="text-lg leading-relaxed">{highlightedText}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tap a red word to hear the correct pronunciation 🔊
                  </p>
                </div>
              )}

              <div className="bg-blue-50 rounded-2xl px-6 py-4 border-2 border-blue-200">
                <p className="text-xl font-bold text-center text-gray-700">
                  {feedback.message}
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    if (currentExercise + 1 < totalExercises) {
                      onExerciseComplete();
                      handleTryAgain();
                    } else {
                      onExerciseComplete();
                      toast.success(
                        "🎉 Great job! You've finished the reading exercises. Now try 'Listen & Write'! 📝",
                        {
                          icon: "📚",
                        }
                      );
                      onNavigate("home");
                    }
                  }}
                  variant="success"
                  size="medium"
                >
                  {currentExercise + 1 < totalExercises
                    ? "Go to the next exercise"
                    : "Finish reading"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
