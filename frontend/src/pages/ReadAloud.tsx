import { useState } from "react";
import { Mic, Home, RotateCw } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { Confetti } from "../components/Confetti";
import { getFeedbackMessage, getRandomSentence } from "../utils/feedback";

interface ReadAloudProps {
  onNavigate: (page: string) => void;
  onExerciseComplete: () => void;
}

export const ReadAloud = ({
  onNavigate,
  onExerciseComplete,
}: ReadAloudProps) => {
  const [sentence, setSentence] = useState(getRandomSentence());
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState(getFeedbackMessage(0));

  const handleRecord = () => {
    setIsRecording(true);

    setTimeout(() => {
      setIsRecording(false);
      const randomAccuracy = Math.floor(Math.random() * 30) + 70;
      setAccuracy(randomAccuracy);
      const newFeedback = getFeedbackMessage(randomAccuracy);
      setFeedback(newFeedback);
      setHasResult(true);
      onExerciseComplete();
    }, 2000);
  };

  const handleTryAgain = () => {
    setSentence(getRandomSentence());
    setHasResult(false);
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col items-center p-8">
      {hasResult && accuracy >= 85 && <Confetti />}

      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => onNavigate("home")}
            icon={Home}
            variant="primary"
            size="small"
          >
            Acasă
          </Button>

          <h1 className="text-5xl font-black">
            <span className="text-red-500">C</span>
            <span className="text-orange-500">i</span>
            <span className="text-yellow-500">t</span>
            <span className="text-green-500">e</span>
            <span className="text-blue-500">ș</span>
            <span className="text-indigo-500">t</span>
            <span className="text-purple-500">e</span>&nbsp;
            <span className="text-pink-500">c</span>
            <span className="text-rose-500">u</span>&nbsp;
            <span className="text-green-500">v</span>
            <span className="text-blue-500">o</span>
            <span className="text-indigo-500">c</span>
            <span className="text-purple-500">e</span>&nbsp;
            <span className="text-pink-500">t</span>
            <span className="text-rose-500">a</span>
            <span className="text-red-500">r</span>
            <span className="text-orange-500">e</span>
          </h1>

          <div className="w-32"></div>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-2xl space-y-8">
          <div className="flex justify-center">
            <Mascot
              message={
                hasResult
                  ? feedback.title
                  : "Citește această propoziție cu voce tare!"
              }
              emoji={hasResult ? feedback.emoji : "🐰"}
            />
          </div>

          {!hasResult && (
            <>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 rounded-2xl p-8 border-4 border-yellow-200">
                <p className="text-3xl font-bold text-gray-700 text-center leading-relaxed">
                  {sentence}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleRecord}
                  disabled={isRecording}
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
                  Ascultă...
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
                    Scor de acuratețe
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-200 to-orange-400 rounded-full transition-all duration-1000"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl px-6 py-4 border-2 border-blue-200">
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
