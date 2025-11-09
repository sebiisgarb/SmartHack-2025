import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  left: number;
  bottom: number;
  color: string;
  popped: boolean;
}

const colorOptions = [
  { name: "red", class: "bg-red-400", code: "red" },
  { name: "yellow", class: "bg-yellow-400", code: "yellow" },
  { name: "green", class: "bg-green-400", code: "green" },
  { name: "blue", class: "bg-blue-400", code: "blue" },
  { name: "purple", class: "bg-purple-400", code: "purple" },
  { name: "pink", class: "bg-pink-400", code: "pink" },
];

export const PopTheBalloonChallenge = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [targetColor, setTargetColor] = useState(
    colorOptions[Math.floor(Math.random() * colorOptions.length)]
  );
  const [targetCount, setTargetCount] = useState(5);
  const [poppedTarget, setPoppedTarget] = useState(0);
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 90;
      const color =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];
      setBalloons((prev) => [
        ...prev,
        { id, left, bottom: 0, color: color.class, popped: false },
      ]);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBalloons((prev) =>
        prev
          .map((b) => ({
            ...b,
            bottom: b.bottom + 2,
          }))
          .filter((b) => b.bottom < 100 && !b.popped)
      );
    }, 100);
    return () => clearInterval(moveInterval);
  }, []);

  const playPopSound = () => {
    const popSound = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_0c997c50cc.mp3?filename=pop-94319.mp3"
    );
    popSound.volume = 0.4;
    popSound.play();
  };

  const popBalloon = (id: number, color: string) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    playPopSound();

    if (color === targetColor.class) {
      setPoppedTarget((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (poppedTarget >= targetCount) {
      setMessage(
        `🎉 Great job! You popped all ${targetCount} ${targetColor.name} balloons!`
      );
      setTimeout(() => {
        nextLevel();
      }, 2500);
    }
  }, [poppedTarget]);

  const nextLevel = () => {
    const newColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)];
    setTargetColor(newColor);
    setTargetCount(5 + level);
    setPoppedTarget(0);
    setLevel((l) => l + 1);
    setMessage("");
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-sky-100 to-blue-200 overflow-hidden rounded-3xl shadow-inner border-4 border-blue-200">
      <div className="absolute top-5 z-50 left-1/2 transform -translate-x-1/2 text-2xl font-extrabold text-gray-700 text-center drop-shadow-lg">
        {message ? message : `Pop ${targetCount} ${targetColor.name} balloons!`}
      </div>

      {balloons.map((b) => (
        <div
          key={b.id}
          onClick={() => !b.popped && popBalloon(b.id, b.color)}
          className={`absolute rounded-full w-14 h-16 ${
            b.color
          } cursor-pointer transition-transform duration-100 ${
            b.popped ? "scale-0 opacity-0" : "hover:scale-110"
          }`}
          style={{
            left: `${b.left}%`,
            bottom: `${b.bottom}%`,
            transition: "bottom 0.1s linear",
          }}
        >
          <div className="absolute w-2 h-6 bg-white left-1/2 top-16 transform -translate-x-1/2 rounded-full opacity-50" />
        </div>
      ))}

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-700 border-2 border-blue-300 bg-white/50 px-5 py-2 rounded-full shadow-md">
        Progress: {poppedTarget}/{targetCount}
      </div>
    </div>
  );
};
