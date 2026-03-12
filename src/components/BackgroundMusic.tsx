import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a royalty-free soft instrumental URL
    const audio = new Audio("https://cdn.pixabay.com/audio/2024/11/29/audio_d4e4df440c.mp3");
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-maroon border-2 border-royal-gold flex items-center justify-center cursor-pointer shadow-gold"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-royal-gold" />
      ) : (
        <VolumeX className="w-5 h-5 text-royal-gold" />
      )}
    </motion.button>
  );
};

export default BackgroundMusic;
