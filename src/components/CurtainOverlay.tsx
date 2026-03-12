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
    setTimeout(onOpen, 2000);
  };

  return (
  <AnimatePresence>
    {<motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Open Button */}
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

      </motion.div>
    }
  </AnimatePresence>
);
}
export default CurtainOverlay;
