import React, { useEffect, useState } from "react";

const letters = [
  "/letters/m.png",
  "/letters/i.png",
  "/letters/c.png",
  "/letters/k.png",
  "/letters/s.png",
];

interface Letter {
  id: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
  image: string;
}

export const FallingLetters = () => {
  const [items, setItems] = useState<Letter[]>([]);

  useEffect(() => {
    const newItems = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 30 + Math.random() * 40,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 5,
      image: letters[Math.floor(Math.random() * letters.length)],
    }));
    setItems(newItems);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none"
      style={{ background: "transparent" }}
    >
      {items.map((item) => (
        <img
          key={item.id}
          src={item.image}
          alt="letter"
          className="absolute animate-fall2 opacity-80"
          style={{
            top: "-80px",
            left: item.left,
            width: `${item.size}px`,
            height: "auto",
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            opacity: 0.05 + Math.random() * 0.05,
            filter: "blur(5px)",
          }}
        />
      ))}
    </div>
  );
};
