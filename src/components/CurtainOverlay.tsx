import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import curtainTexture from "@/assets/curtain-texture.jpg";

interface GoldParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const CurtainOverlay = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [particles, setParticles] = useState<GoldParticle[]>([]);

  const handleOpen = () => {
    const newParticles: GoldParticle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.8,
    }));
    setParticles(newParticles);
    setIsOpening(true);
    setTimeout(() => {
        onOpen();
      }, 2000);
  };

  return (
    <AnimatePresence>
      {!isOpening || particles.length > 0 ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          {/* Left Curtain */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
            animate={isOpening ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${curtainTexture})`,
                boxShadow: "inset -30px 0 60px rgba(0,0,0,0.5)",
              }}
            />
            <div className="absolute top-0 right-0 w-8 h-full gradient-gold opacity-40" />
          </motion.div>

          {/* Right Curtain */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
            animate={isOpening ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${curtainTexture})`,
                transform: "scaleX(-1)",
                boxShadow: "inset 30px 0 60px rgba(0,0,0,0.5)",
              }}
            />
            <div className="absolute top-0 left-0 w-8 h-full gradient-gold opacity-40" />
          </motion.div>

          {/* Gold tassel/valance at top */}
          <motion.div
            className="absolute top-0 left-0 w-full h-16 gradient-gold opacity-60 z-10"
            animate={isOpening ? { opacity: 0, y: -20 } : {}}
            transition={{ duration: 1.5 }}
          />

          {/* Sparkle particles */}
          {isOpening && particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: "radial-gradient(circle, hsl(43, 80%, 75%), hsl(43, 65%, 52%), transparent)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: p.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Open Button */}
          {!isOpening && (
            <motion.button
              onClick={handleOpen}
              className="relative z-20 px-10 py-4 font-display text-lg tracking-[0.2em] uppercase gold-shine text-accent-foreground rounded-sm border-2 border-royal-gold-light cursor-pointer"
              style={{ color: "hsl(345, 80%, 10%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsla(43, 65%, 52%, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              ✦ Open Invitation ✦
            </motion.button>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CurtainOverlay;
