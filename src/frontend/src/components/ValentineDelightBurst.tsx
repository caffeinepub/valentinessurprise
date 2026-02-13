import React from 'react';
import { Heart } from 'lucide-react';

interface HeartParticle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface ValentineDelightBurstProps {
  onComplete?: () => void;
}

const MAX_PARTICLES = 15;

export default function ValentineDelightBurst({ onComplete }: ValentineDelightBurstProps) {
  const [particles, setParticles] = React.useState<HeartParticle[]>([]);

  React.useEffect(() => {
    // Generate random heart particles
    const newParticles: HeartParticle[] = Array.from({ length: MAX_PARTICLES }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1.5,
      size: 20 + Math.random() * 20,
    }));

    setParticles(newParticles);

    // Cleanup after longest animation completes
    const maxDuration = Math.max(...newParticles.map(p => p.duration + p.delay));
    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, maxDuration * 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bottom-0 animate-float-heart"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          <Heart
            className="text-rose-500 fill-rose-500 drop-shadow-lg"
            size={particle.size}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.5))',
            }}
          />
        </div>
      ))}
    </div>
  );
}
