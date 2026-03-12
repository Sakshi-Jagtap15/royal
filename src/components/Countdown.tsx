import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { parseISO } from "date-fns";

interface CountdownProps {
  weddingDate?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ weddingDate = "2026-12-12" }: CountdownProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const targetDate = (() => {
    try {
      return parseISO(weddingDate + "T10:00:00").getTime();
    } catch {
      return new Date("2026-12-12T10:00:00").getTime();
    }
  })();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="py-24 bg-maroon relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="font-display text-3xl md:text-4xl gold-text-gradient mb-16 tracking-[0.15em]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Counting Down To Our Day
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {units.map((unit, i) => (
            <motion.div
              key={unit.label}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <div className="p-[2px] rounded-sm" style={{ background: "var(--gradient-gold)" }}>
                <div className="bg-deep-maroon px-6 md:px-10 py-6 md:py-8 rounded-sm min-w-[90px] md:min-w-[120px]">
                  <motion.span
                    key={unit.value}
                    className="block font-display text-4xl md:text-6xl gold-text-gradient"
                    initial={{ rotateX: -90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.span>
                  <span
                    className="block font-elegant text-sm md:text-base tracking-[0.2em] uppercase mt-2"
                    style={{ color: "hsl(43, 70%, 70%)" }}
                  >
                    {unit.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
