import { useState, useEffect } from "react";
import { Play, Send, Home, RotateCw } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { Confetti } from "../components/Confetti";
import { getFeedbackMessage } from "../utils/feedback";
import { fetchSentences_tts } from "../api/sentences";
import { ExerciseResult } from "../types";

interface ListenWriteProps {
  onNavigate: (page: string) => void;
  onExerciseComplete: () => void;
  onExerciseResult: (result: ExerciseResult) => void;
  currentExercise: number;
  totalExercises: number;
}

export const ListenWrite = ({
  onNavigate,
  onExerciseComplete,
  onExerciseResult,
  currentExercise,
  totalExercises,
}: ListenWriteProps) => {
  const [sentence, setSentence] = useState<string>("");
  const [sentencesData, setSentencesData] = useState<any>(null);
  const [userInput, setUserInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState(getFeedbackMessage(0));

  useEffect(() => {
    async function loadSentences() {
      const data = await fetchSentences_tts();
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

  const handlePlayAudio = async () => {
    if (!sentence) return;
    setIsPlaying(true);

    try {
      const formData = new FormData();
      formData.append("text", sentence);

      const response = await fetch("http://127.0.0.1:8001/generate_audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error playing audio");

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.onended = () => setIsPlaying(false);
      audio.play();
    } catch (err) {
      console.error("Error playing sentence:", err);
      alert("Could not play the audio sentence.");
      setIsPlaying(false);
    }
  };

  const calculateAccuracy = (input: string, target: string): number => {
    const inputWords = input.toLowerCase().trim().split(/\s+/);
    const targetWords = target.toLowerCase().trim().split(/\s+/);
    if (inputWords.length === 0) return 0;

    let matches = 0;
    targetWords.forEach((word, index) => {
      if (inputWords[index] === word) matches++;
    });

    return Math.round((matches / targetWords.length) * 100);
  };

  const handleSubmit = () => {
    const calculatedAccuracy = calculateAccuracy(userInput, sentence);
    setAccuracy(calculatedAccuracy);
    const newFeedback = getFeedbackMessage(calculatedAccuracy);
    setFeedback(newFeedback);
    setHasResult(true);

    onExerciseResult({
      type: "tts",
      sentence,
      writtenText: userInput,
      score: calculatedAccuracy,
    });
  };

  const handleTryAgain = () => {
    if (sentencesData) pickRandomSentence(sentencesData);
    setUserInput("");
    setHasResult(false);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex flex-col items-center p-8">
      {hasResult && accuracy >= 85 && <Confetti />}

      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => onNavigate("home")}
            icon={Home}
            variant="secondary"
            size="small"
          >
            Home
          </Button>

          <h1 className="text-5xl font-black">
            <span className="text-red-500">L</span>
            <span className="text-orange-500">i</span>
            <span className="text-yellow-500">s</span>
            <span className="text-green-500">t</span>
            <span className="text-blue-500">e</span>
            <span className="text-indigo-500">n</span>&nbsp;
            <span className="text-purple-500">&</span>&nbsp;
            <span className="text-pink-500">W</span>
            <span className="text-rose-500">r</span>
            <span className="text-red-500">i</span>
            <span className="text-yellow-500">t</span>
            <span className="text-green-500">e</span>
          </h1>

          <div className="w-32"></div>
        </div>

        <p className="text-center text-gray-500 font-semibold">
          Exercise {currentExercise + 1} of {totalExercises}
        </p>

        <div className="bg-white rounded-3xl p-12 shadow-2xl space-y-8">
          <div className="flex justify-center">
            <Mascot
              message={
                hasResult
                  ? feedback.title
                  : "Listen carefully and write what you hear!"
              }
              emoji={hasResult ? feedback.emoji : "🐶"}
            />
          </div>

          {!hasResult && (
            <>
              <div className="flex justify-center">
                <button
                  onClick={handlePlayAudio}
                  disabled={isPlaying}
                  className={`w-24 h-24 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 ${
                    isPlaying
                      ? "bg-green-500 animate-pulse scale-110"
                      : "bg-gradient-to-br from-green-500 to-green-500 hover:scale-110"
                  }`}
                >
                  <Play className="w-12 h-12 text-white ml-2" />
                </button>
              </div>

              {isPlaying && (
                <p className="text-lg font-bold text-center text-gray-600 animate-pulse">
                  Playing the sentence...
                </p>
              )}

              <div className="space-y-4">
                <label className="text-2xl font-bold pb-2 text-gray-700 block text-center">
                  Type what you heard:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-6 py-3 text-2xl font-semibold rounded-2xl border-4 border-yellow-300 focus:border-yellow-500 focus:outline-none bg-yellow-50"
                  placeholder="Type here..."
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSubmit}
                  icon={Send}
                  variant="success"
                  size="medium"
                  disabled={!userInput.trim()}
                >
                  Submit Answer
                </Button>
              </div>
            </>
          )}

          {hasResult && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl px-8 py-6 border-4 border-blue-300">
                <div className="text-center space-y-4">
                  <p className="text-6xl font-black text-blue-600">
                    {accuracy}%
                  </p>
                  <p className="text-2xl font-bold text-gray-700">
                    Accuracy Score
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                  <p className="text-xl font-bold text-gray-600 mb-2">
                    Correct answer:
                  </p>
                  <p className="text-lg font-bold text-gray-800">{sentence}</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                  <p className="text-xl font-bold text-gray-600 mb-2">
                    Your answer:
                  </p>
                  <p className="text-lg font-bold text-gray-800">{userInput}</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-2xl px-6 py-3 border-2 border-yellow-200">
                <p className="text-2xl font-bold text-center text-gray-700">
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
                      onNavigate("home");
                    }
                  }}
                  variant="success"
                  size="medium"
                >
                  {currentExercise + 1 < totalExercises
                    ? "Go to the next exercise"
                    : "Finish the test"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
