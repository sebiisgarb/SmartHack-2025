# 📚 VoiceLearn+

<div align="center">

![VoiceLearn+ Logo](https://img.shields.io/badge/VoiceLearn+-AI%20Powered%20Learning-blueviolet?style=for-the-badge&logo=book-open)

**AI-powered learning platform for early readers and writers**

[![SmartHack 2025](https://img.shields.io/badge/SmartHack-2025-orange?style=flat-square)](https://smarthack.ro)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

*Presented by Team RAVS at SmartHack 2025*

</div>

---

## 🎯 The Problem

Children in early grades struggle with:

- 📖 **Reading aloud** with correct pronunciation
- ✍️ **Writing what they hear** (dictation)
- 💬 **Getting personalized feedback** in real time

Teachers spend hours identifying patterns and giving individual feedback manually.

**Result:** Slow learning progress and lack of personalized attention.

---

## 💡 The Solution

**VoiceLearn+** uses AI to create a personalized reading and writing coach for each student. It includes:

### 🎙️ Read Aloud Mode
Student reads a sentence; AI checks pronunciation accuracy and highlights mistakes.

### ✍️ Listen & Write Mode  
Student listens and types what they hear; AI checks spelling and context accuracy.

### 📊 Teacher Dashboard
Shows progress, accuracy scores, and personalized teaching insights.

---

## 🔧 How It Works

### For Students

| Feature | Description |
|---------|-------------|
| 🎤 **Speech Recognition (STT)** | Compare spoken text with target text |
| 📊 **Accuracy Scoring** | Using text similarity (Levenshtein distance) |
| 🔊 **Highlighted Feedback** | Correct pronunciation playback for mispronounced words |

### For Teachers

AI reports are generated automatically with insights like:
> *"Student often confuses write/right. Recommend homophone exercises."*

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript + Vite + TailwindCSS |
| **Backend** | FastAPI (Python) |
| **Database** | PostgreSQL |
| **AI/ML** | Faster Whisper / GPT-4o-mini TTS |
| **AI Feedback Engine** | Powered by OpenAI |

---

## 📁 Project Structure

```
SmartHack-2025/
├── API/                      # Backend FastAPI server
│   ├── main.py               # API endpoints
│   ├── models.py             # Database models
│   ├── database.py           # Database configuration
│   └── docker-compose.yml    # Docker setup
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── ReadAloud.tsx
│   │   │   ├── ListenWrite.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Reward.tsx
│   │   ├── components/       # Reusable UI components
│   │   ├── api/              # API client functions
│   │   ├── utils/            # Utility functions
│   │   └── types/            # TypeScript types
│   └── package.json
├── sentences.sql             # Sample sentences for exercises
├── students.sql              # Sample student data
└── VoiceLearn+.pdf           # Project presentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL
- OpenAI API Key

### Backend Setup

```bash
# Navigate to API directory
cd API

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# Start the server
uvicorn main:app --reload --port 8001
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup

```bash
# Run with Docker
cd API
docker-compose up -d

# Or manually create PostgreSQL database and run SQL scripts
psql -d your_database -f ../sentences.sql
psql -d your_database -f ../students.sql
```

---

## 📚 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/sentences_stt` | GET | Get sentences for Read Aloud exercises |
| `/sentences_tts` | GET | Get sentences for Listen & Write exercises |
| `/analyze_audio` | POST | Analyze student's audio recording |
| `/teacher_report` | POST | Generate AI-powered teacher feedback |
| `/submit_results` | POST | Submit all exercise results for final report |
| `/generate_audio` | POST | Generate TTS audio for sentences |
| `/health` | GET | Health check endpoint |

---

## ⚖️ Ethics & Privacy

| Principle | Implementation |
|-----------|----------------|
| 🔒 **Privacy First** | Does not permanently store students' voices |
| 🤖 **AI as Assistant** | Shows how AI can be used as an educational assistant, not as a teacher replacement |
| 🌍 **Equal Access** | Reduces learning inequalities between urban and rural areas by offering free AI vocal practice |

---

## ✨ Impact

### For Students
- ✅ Builds confidence through instant feedback
- ✅ Improves reading and listening comprehension  
- ✅ Makes learning fun and gamified 🎉

### For Teachers
- ✅ Saves time with automated analysis
- ✅ Enables data-driven teaching decisions

---

## 🔮 Next Steps

1. ⏱️ Running real-time classroom tests
2. 🌍 Multilingual support
3. 🎮 Gamified learning paths

---

## 👥 Team RAVS

This project was created for **SmartHack 2025**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for early learners**

*SmartHack 2025*

</div>