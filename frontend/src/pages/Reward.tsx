import { Home, Gamepad2 } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { Confetti } from "../components/Confetti";
import { PopTheBalloonChallenge } from "../components/PopTheBalloonGame";

interface RewardProps {
  onNavigate: (page: string) => void;
}

export const Reward = ({ onNavigate }: RewardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col items-center p-8">
      <Confetti />

      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => onNavigate("home")}
            icon={Home}
            variant="purple"
            size="small"
          >
            Home
          </Button>

          <h1 className="text-5xl font-black">
            <span className="text-red-500">P</span>
            <span className="text-orange-500">l</span>
            <span className="text-yellow-500">a</span>
            <span className="text-green-500">y</span>
            <span> </span>
            <span className="text-blue-500">T</span>
            <span className="text-indigo-500">i</span>
            <span className="text-purple-500">m</span>
            <span className="text-pink-500">e</span>
          </h1>

          <div className="w-32"></div>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-2xl space-y-8">
          <div className="flex justify-center">
            <Mascot message="Amazing! You’ve earned play time!" emoji="🏆" />
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-50 rounded-2xl px-8 py-7 border-4 border-purple-200">
            <div className="text-center space-y-4">
              <p className="text-4xl font-black text-purple-600">
                🎉 Congratulations! 🎉
              </p>
              <p className="text-2xl font-semibold text-gray-700">
                You’ve successfully completed all the exercises!
              </p>
              <p className="text-xl text-gray-600">
                Here’s a fun game as your reward!
              </p>
            </div>
          </div>

          <PopTheBalloonChallenge />

          <div className="flex justify-center">
            <Button
              onClick={() => onNavigate("home")}
              icon={Home}
              variant="success"
              size="small"
            >
              Back to Home Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
