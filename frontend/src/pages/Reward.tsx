import { Home, Gamepad2 } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { Confetti } from "../components/Confetti";

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
            Acasă
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
            <Mascot message="Uimitor! Ai câștigat timp de joacă!" emoji="🏆" />
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-50 rounded-2xl px-8 py-7 border-4 border-purple-200">
            <div className="text-center space-y-4">
              <p className="text-4xl font-black text-purple-600">
                🎉 Felicitări! 🎉
              </p>
              <p className="text-2xl font-semibold text-gray-700">
                Ai finalizat toate exercițiile cu succes!
              </p>
              <p className="text-xl text-gray-600">
                Iată un joc distractiv ca recompensă!
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-200 to-yellow-200 rounded-2xl p-1 shadow-xl">
            <div
              className="bg-white rounded-xl overflow-hidden"
              style={{ height: "550px" }}
            >
              <div className="h-full flex flex-col items-center justify-center space-y-6 bg-gradient-to-br from-yellow-50 to-yellow-50">
                <Gamepad2 className="w-24 h-24 text-blue-300" />
                <p className="text-2xl font-bold text-gray-700">
                  Zona de Mini-Jocuri 🎮
                </p>
                <p className="text-lg text-gray-600 text-center max-w-lg">
                  Alege un joc din lista de mai jos! <br />
                  Apasă butonul de mai jos când ești pregătit să continui
                  învățarea.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {["🎨", "🧩", "🎯", "🎪", "🎭", "🎸"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-4xl transform hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => onNavigate("home")}
              icon={Home}
              variant="success"
              size="medium"
            >
              Înapoi la învățare
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
