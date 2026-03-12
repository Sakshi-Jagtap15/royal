import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Flower2, Music, Heart, PartyPopper } from "lucide-react";

const events = [
  {
    name: "Haldi",
    icon: Sparkles,
    date: "10 December 2026",
    time: "10:00 AM",
    venue: "Palace Garden, Udaipur",
    mapLink: "https://maps.google.com",
  },
  {
    name: "Mehendi",
    icon: Flower2,
    date: "10 December 2026",
    time: "4:00 PM",
    venue: "Zenana Mahal, City Palace",
    mapLink: "https://maps.google.com",
  },
  {
    name: "Sangeet",
    icon: Music,
    date: "11 December 2026",
    time: "7:00 PM",
    venue: "Jagmandir Island Palace",
    mapLink: "https://maps.google.com",
  },
  {
    name: "Wedding Ceremony",
    icon: Heart,
    date: "12 December 2026",
    time: "10:00 AM",
    venue: "The Grand Durbar Hall",
    mapLink: "https://maps.google.com",
  },
  {
    name: "Reception",
    icon: PartyPopper,
    date: "12 December 2026",
    time: "7:00 PM",
    venue: "Lakeside Pavilion, Udaipur",
    mapLink: "https://maps.google.com",
  },
];

const WeddingEvents = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-ivory relative">
      <div className="container mx-auto px-6">
        <motion.h2
          className="font-display text-3xl md:text-4xl text-maroon text-center mb-16 tracking-[0.15em]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Wedding Celebrations
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.name}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              >
                <div className="p-[1.5px] rounded-sm transition-all duration-300 group-hover:-translate-y-2" style={{ background: "var(--gradient-gold)" }}>
                  <div className="bg-ivory p-8 rounded-sm text-center h-full">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-maroon flex items-center justify-center">
                      <Icon className="w-7 h-7 text-royal-gold" />
                    </div>
                    <h3 className="font-display text-xl text-maroon mb-3 tracking-wide">{event.name}</h3>
                    <p className="font-elegant text-lg text-foreground mb-1">{event.date}</p>
                    <p className="font-elegant text-lg text-gold font-semibold mb-3">{event.time}</p>
                    <p className="font-elegant text-muted-foreground mb-4">{event.venue}</p>
                    <a
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-display text-xs tracking-[0.15em] uppercase px-5 py-2 border border-royal-gold text-gold rounded-sm hover:bg-royal-gold hover:text-accent-foreground transition-all duration-300"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WeddingEvents;
