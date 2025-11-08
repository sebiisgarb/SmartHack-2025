import { useEffect, useState } from 'react';

export const Confetti = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 animate-fall"
          style={{
            left: `${particle.left}%`,
            top: '-20px',
            animationDelay: `${particle.delay}s`,
            backgroundColor: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'][
              Math.floor(Math.random() * 5)
            ],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};
