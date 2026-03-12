import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Wedding couple", span: "md:col-span-2 md:row-span-2" },
  { src: gallery2, alt: "Mehendi ceremony", span: "" },
  { src: gallery3, alt: "Sangeet celebration", span: "" },
  { src: gallery4, alt: "Wedding mandap", span: "md:col-span-2" },
  { src: gallery5, alt: "Reception dinner", span: "" },
  { src: gallery6, alt: "Bridal jewelry", span: "" },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 bg-beige relative">
      <div className="container mx-auto px-6">
        <motion.h2
          className="font-display text-3xl md:text-4xl text-maroon text-center mb-16 tracking-[0.15em]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          Our Moments
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${img.span}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
              onClick={() => setSelected(i)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-deep-maroon/0 group-hover:bg-deep-maroon/20 transition-all duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-royal-gold/50 rounded-sm transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-deep-maroon/90 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <button
                className="absolute top-6 right-6 text-royal-gold hover:text-royal-gold-light transition-colors"
                onClick={() => setSelected(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <motion.img
                src={images[selected].src}
                alt={images[selected].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-gold"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
