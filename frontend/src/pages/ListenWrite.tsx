import { useState } from "react";
import { Play, Send, Home, RotateCw } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { Confetti } from "../components/Confetti";
import { getFeedbackMessage, getRandomSentence } from "../utils/feedback";

interface ListenWriteProps {
  onNavigate: (page: string) => void;
  onExerciseComplete: () => void;
}

export const ListenWrite = ({
  onNavigate,
  onExerciseComplete,
}: ListenWriteProps) => {
  const [sentence, setSentence] = useState(getRandomSentence());
  const [userInput, setUserInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState(getFeedbackMessage(0));

  const handlePlayAudio = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
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
    onExerciseComplete();
  };

  const handleTryAgain = () => {
    setSentence(getRandomSentence());
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
            Acasă
          </Button>

          <h1 className="text-5xl font-black">
            <span className="text-red-500">A</span>
            <span className="text-orange-500">s</span>
            <span className="text-yellow-500">c</span>
            <span className="text-green-500">u</span>
            <span className="text-blue-500">l</span>
            <span className="text-indigo-500">t</span>
            <span className="text-purple-500">ă</span>&nbsp;
            <span className="text-pink-500">ș</span>
            <span className="text-rose-500">i</span>&nbsp;
            <span className="text-red-500">s</span>
            <span className="text-yellow-500">c</span>
            <span className="text-green-500">r</span>
            <span className="text-blue-500">i</span>
            <span className="text-indigo-500">e</span>
          </h1>

          <div className="w-32"></div>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-2xl space-y-8">
          <div className="flex justify-center">
            <Mascot
              message={
                hasResult
                  ? feedback.title
                  : "Ascultă cu atenție și scrie ce auzi!"
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
                <p className="text-2xl font-bold text-center text-gray-600 animate-pulse">
                  Se redă...
                </p>
              )}

              <div className="space-y-4">
                <label className="text-2xl font-bold pb-2 text-gray-700 block text-center">
                  Scrie ce ai auzit:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-6 py-3 text-2xl font-semibold rounded-2xl border-4 border-yellow-300 focus:border-yellow-500 focus:outline-none bg-yellow-50"
                  placeholder="Scrie aici..."
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
                  Trimite răspunsul
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
                    Scor de acuratețe
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
                    Răspuns corect:
                  </p>
                  <p className="text-lg font-bold text-gray-800">{sentence}</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                  <p className="text-xl font-bold text-gray-600 mb-2">
                    Răspunsul tău:
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
                  onClick={handleTryAgain}
                  icon={RotateCw}
                  variant="success"
                  size="medium"
                >
                  Încearcă o altă propoziție
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
