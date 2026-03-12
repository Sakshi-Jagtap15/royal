import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/wedding.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Button */}
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