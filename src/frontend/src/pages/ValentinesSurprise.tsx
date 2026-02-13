import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ValentineDelightBurst from '@/components/ValentineDelightBurst';

export default function ValentinesSurprise() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioError, setAudioError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [showBurst, setShowBurst] = React.useState(false);
  const [showSecretMessage, setShowSecretMessage] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  React.useEffect(() => {
    // Trigger animations after mount
    setIsLoaded(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked, user interaction needed
          setAudioError(false);
        });
    }
  }, []);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((error) => {
          console.error('Audio playback failed:', error);
          setAudioError(true);
        });
    }
  };

  const handleButtonClick = () => {
    // Preserve existing music playback behavior
    if (!isPlaying && audioRef.current) {
      handlePlayMusic();
    }

    // Trigger delight interaction
    setShowBurst(true);
    setClickCount(prev => prev + 1);
    
    // Show secret message after first click
    if (!showSecretMessage) {
      setTimeout(() => {
        setShowSecretMessage(true);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Background Romantic Music */}
      <audio ref={audioRef} loop>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Valentine Delight Burst Effect */}
      {showBurst && (
        <ValentineDelightBurst
          onComplete={() => setShowBurst(false)}
        />
      )}

      {/* Hero Section */}
      <div
        className={`mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-4 animate-in fade-in slide-in-from-top-4">
          Happy Valentine's Day Riddhuudi ❤️
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto">
          To the most beautiful girl in my life, my Riddhuudi, this little
          website is just a small surprise to show how much you mean to me.
        </p>
      </div>

      {/* Love Card */}
      <div
        className={`transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-md max-w-md hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="p-6">
            <Heart className="mx-auto text-rose-500 mb-4 animate-pulse" size={48} />
            <p className="text-gray-800 text-base leading-relaxed">
              Every moment with you feels magical. Your smile brightens my
              darkest days, your voice is my favorite sound, and your love is my
              greatest blessing.
              <br />
              <br />
              I promise to always stand by you, support you, and love you
              endlessly. You are my today and all of my tomorrows, Riddhuudi. 💕
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Button Section */}
      <div
        className={`mt-8 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Button
          onClick={handleButtonClick}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Forever Yours ❤️
            {clickCount > 0 && <Sparkles className="w-4 h-4 animate-pulse" />}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
        {!isPlaying && (
          <p className="text-sm text-gray-600 mt-2 animate-pulse">
            Click to play romantic music 🎵
          </p>
        )}
        {audioError && (
          <p className="text-sm text-red-500 mt-2">
            Unable to play music. Please check your browser settings.
          </p>
        )}
      </div>

      {/* Secret Love Message - Revealed on Click */}
      {showSecretMessage && (
        <div className="mt-8 max-w-md animate-secret-reveal">
          <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="text-rose-500 animate-pulse" size={24} />
                <h3 className="text-xl font-semibold text-rose-600">
                  A Secret Just For You
                </h3>
                <Sparkles className="text-rose-500 animate-pulse" size={24} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed italic">
                "In a world full of temporary things, you are a perpetual feeling. 
                Every heartbeat whispers your name, every breath carries my love for you. 
                You're not just my Valentine today—you're my forever, my always, my everything. 
                Thank you for being the most incredible person in my universe, Riddhuudi. 
                I love you more than words could ever express. 💖✨"
              </p>
              {clickCount > 3 && (
                <p className="text-xs text-rose-500 mt-4 animate-pulse">
                  P.S. You've clicked {clickCount} times! Each click fills my heart with more love! 💕
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`mt-12 text-gray-600 text-sm transition-all duration-1000 delay-[1500ms] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Made with endless love 💖 |{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== 'undefined' ? window.location.hostname : 'valentines-surprise'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-rose-500 transition-colors inline-flex items-center gap-1"
        >
          Built with <Heart className="inline w-3 h-3 text-rose-500" /> using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
