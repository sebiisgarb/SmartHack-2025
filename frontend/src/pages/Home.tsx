import { BookOpen, Headphones, UserCircle, Lock } from "lucide-react";
import { Button } from "../components/Button";
import { Mascot } from "../components/Mascot";
import { FallingLetters } from "../components/FallingLetters";

interface HomeProps {
  onNavigate: (page: string) => void;
  unlockedSection: "read" | "listen";
}

export const Home = ({ onNavigate, unlockedSection }: HomeProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-white to-blue-100 flex flex-col items-center justify-center p-8 overflow-hidden">
      <FallingLetters />

      <div className="max-w-4xl w-full space-y-12 relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex items-center mt-8 justify-center gap-4">
            <BookOpen className="w-16 h-16 text-blue-300" />
            <h1 className="text-7xl font-black">
              <span className="text-red-500">V</span>
              <span className="text-orange-500">o</span>
              <span className="text-yellow-500">i</span>
              <span className="text-green-500">c</span>
              <span className="text-blue-500">e</span>
              <span className="text-indigo-500">L</span>
              <span className="text-purple-500">e</span>
              <span className="text-pink-500">a</span>
              <span className="text-rose-500">r</span>
              <span className="text-red-500">n</span>
              <span className="text-yellow-400">+</span>
            </h1>
          </div>
          <p className="text-2xl font-semibold text-gray-400">
            Learn reading and listening in a fun way!
          </p>
        </div>

        <div className="flex justify-center">
          <Mascot message="Hi! What do you want to learn today?" emoji="🐻" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            onClick={() =>
              unlockedSection === "read" && onNavigate("read-aloud")
            }
            className={`relative bg-white rounded-3xl p-8 shadow-2xl transform transition-all duration-300 border-4 
              ${
                unlockedSection === "read"
                  ? "cursor-pointer hover:scale-105 border-blue-200 hover:border-blue-400"
                  : "opacity-50 cursor-not-allowed border-gray-200"
              }`}
          >
            {unlockedSection !== "read" && (
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
                <Lock className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 font-semibold">Locked</p>
              </div>
            )}
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-300 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white pt-1" />
              </div>
              <h2 className="text-3xl font-black text-blue-400">Read Aloud</h2>
              <p className="text-lg text-gray-600 text-center">
                Read the sentences and practice your pronunciation!
              </p>
              <Button variant="primary" size="small">
                Start Reading
              </Button>
            </div>
          </div>

          {/* 🔸 Listen & Write */}
          <div
            onClick={() =>
              unlockedSection === "listen" && onNavigate("listen-write")
            }
            className={`relative bg-white rounded-3xl p-8 shadow-2xl transform transition-all duration-300 border-4 
              ${
                unlockedSection === "listen"
                  ? "cursor-pointer hover:scale-105 border-yellow-200 hover:border-yellow-400"
                  : "opacity-50 cursor-not-allowed border-gray-200"
              }`}
          >
            {unlockedSection !== "listen" && (
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
                <Lock className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 font-semibold">Locked</p>
              </div>
            )}
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-300 rounded-full flex items-center justify-center">
                <Headphones className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-yellow-400">
                Listen & Write
              </h2>
              <p className="text-lg text-gray-600 text-center">
                Listen carefully and type what you <br /> hear!
              </p>
              <Button variant="secondary" size="small">
                Start Listening
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-500 transition-colors duration-200"
          >
            <UserCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">Teacher Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
