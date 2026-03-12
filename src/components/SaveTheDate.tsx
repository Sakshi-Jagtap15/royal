import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { parseISO, getDate, format, getYear } from "date-fns";

interface SaveTheDateProps {
  weddingDate?: string;
}

const SaveTheDate = ({ weddingDate = "2026-12-12" }: SaveTheDateProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const parsed = (() => {
    try {
      const d = parseISO(weddingDate);
      return {
        day: String(getDate(d)),
        month: format(d, "MMMM"),
        year: String(getYear(d)),
        dayOfWeek: format(d, "EEEE"),
      };
    } catch {
      return { day: "12", month: "December", year: "2026", dayOfWeek: "Saturday" };
    }
  })();

  const dateChars = parsed.day.split("");
  const monthChars = parsed.month.split("");

  return (
    <section ref={ref} className="py-24 bg-ivory relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="font-display text-3xl md:text-4xl text-maroon mb-12 tracking-[0.15em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Save The Date
        </motion.h2>

        {/* Gold frame card */}
        <motion.div
          className="inline-block p-1 rounded-sm"
          style={{ background: "var(--gradient-gold)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-ivory px-12 md:px-20 py-12 md:py-16 rounded-sm relative">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-sm"
              animate={isInView ? {
                boxShadow: [
                  "0 0 5px hsla(43, 65%, 52%, 0.2)",
                  "0 0 30px hsla(43, 65%, 52%, 0.4)",
                  "0 0 5px hsla(43, 65%, 52%, 0.2)",
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />

            <motion.p
              className="font-display text-lg tracking-[0.3em] uppercase text-maroon mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {parsed.dayOfWeek}
            </motion.p>

            <div className="flex items-center justify-center gap-2 mb-6">
              {dateChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="font-display text-6xl md:text-8xl gold-text-gradient"
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={isInView ? { opacity: 1, rotateX: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1 mb-4">
              {monthChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="font-elegant text-2xl md:text-3xl text-maroon tracking-[0.2em]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="font-display text-3xl md:text-4xl gold-text-gradient"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8 }}
            >
              {parsed.year}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SaveTheDate;
