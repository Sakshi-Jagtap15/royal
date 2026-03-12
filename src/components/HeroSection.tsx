import { motion } from "framer-motion";
import palaceBg from "@/assets/palace-bg.jpg";
import { format, parseISO } from "date-fns";


interface HeroSectionProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  venue?: string;
  story?: string | null;
}

const HeroSection = ({
  brideName = "Priya",
  groomName = "Arjun",
  weddingDate = "2026-12-12",
  venue = "The Royal Palace, Udaipur",
  story = "Together with their families invite you to celebrate",
}: HeroSectionProps) => {
  const formattedDate = (() => {
    try {
      return format(parseISO(weddingDate), "EEEE, d MMMM yyyy");
    } catch {
      return weddingDate;
    }
  })();

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 md:py-32">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${palaceBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-maroon/70 via-deep-maroon/50 to-deep-maroon/80" />

      {/* Floral border frame */}
      <div className="absolute inset-4 md:inset-12 border-2 border-royal-gold/30 rounded-sm pointer-events-none">
        <div className="absolute -top-1 -left-1 w-16 h-16 border-t-2 border-l-2 border-royal-gold rounded-tl-sm" />
        <div className="absolute -top-1 -right-1 w-16 h-16 border-t-2 border-r-2 border-royal-gold rounded-tr-sm" />
        <div className="absolute -bottom-1 -left-1 w-16 h-16 border-b-2 border-l-2 border-royal-gold rounded-bl-sm" />
        <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-2 border-r-2 border-royal-gold rounded-br-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-16 max-w-4xl mx-auto">
        <motion.p 
        className="font-elegant text-sm md:text-xl tracking-[0.25em] uppercase mb-6 max-w-3xl mx-auto"
          style={{ color: "hsl(43, 70%, 70%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {story || "Together with their families invite you to celebrate"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0.7, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="font-script text-5xl md:text-8xl gold-text-gradient leading-[1.2]">
            {brideName}
          </h1>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4 mb-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <div className="royal-divider w-16 md:w-24" />
          <span className="text-3xl">❤️</span>
          <div className="royal-divider w-16 md:w-24" />
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h1 className="font-script text-5xl md:text-8xl gold-text-gradient leading-tight">
            {groomName}
          </h1>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="royal-divider w-24 md:w-40" />
          <span className="text-royal-gold text-2xl">✦</span>
          <div className="royal-divider w-24 md:w-40" />
        </motion.div>

        <motion.p
          className="font-display text-lg md:text-2xl tracking-[0.15em]"
          style={{ color: "hsl(43, 70%, 70%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          {formattedDate}
        </motion.p>

        <motion.p
          className="font-elegant text-base md:text-lg mt-4 italic tracking-wide"
          style={{ color: "hsl(36, 33%, 80%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          at {venue}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
