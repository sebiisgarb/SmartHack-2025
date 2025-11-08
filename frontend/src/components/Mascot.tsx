import { Sparkles } from "lucide-react";

interface MascotProps {
  message?: string;
  emoji?: string;
}

export const Mascot = ({ message, emoji = "🌟" }: MascotProps) => {
  return (
    <div className="flex flex-col items-center gap-4 animate-bounce-slow">
      {message && (
        <div className="relative note-paper bg-white bg-[url('/images/sheet.jpg.avif')] bg-cover bg-center rounded-lg px-6 py-4 shadow-lg max-w-md text-center rotate-[-2deg]">
          <p className="text-lg font-bold text-gray-700 leading-relaxed">
            {message}
          </p>
          <span className="absolute -top-6 text-3xl">{emoji}</span>
        </div>
      )}
    </div>
  );
};
