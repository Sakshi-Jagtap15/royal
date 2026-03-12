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
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* LEFT CURTAIN */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{ backgroundImage: `url(${curtainTexture})`, backgroundSize: "cover" }}
        animate={isOpening ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* RIGHT CURTAIN */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          backgroundImage: `url(${curtainTexture})`,
          backgroundSize: "cover",
          transform: "scaleX(-1)"
        }}
        animate={isOpening ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* BUTTON */}
      {!isOpening && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <button
            onClick={handleOpen}
            className="px-10 py-4 border-2 border-yellow-500 text-yellow-500"
          >
            ✦ Open Invitation ✦
          </button>
        </div>
      )}

    </motion.div>
  </AnimatePresence>
);
};

export default CurtainOverlay;
