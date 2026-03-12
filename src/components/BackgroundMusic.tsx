import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // autoplay after first user interaction
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
        setPlaying(true);
      }
      document.removeEventListener("click", startMusic);
    };

    document.addEventListener("click", startMusic);

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/wedding.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border-2 border-royal-gold bg-deep-maroon flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        {playing ? (
          <Volume2 className="text-royal-gold" size={22} />
        ) : (
          <VolumeX className="text-royal-gold" size={22} />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;