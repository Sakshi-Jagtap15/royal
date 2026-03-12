import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";

interface WeddingFooterProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
}

const WeddingFooter = ({
  brideName = "Priya",
  groomName = "Arjun",
  weddingDate = "2026-12-12",
}: WeddingFooterProps) => {
  const formattedDate = (() => {
    try {
      return format(parseISO(weddingDate), "EEEE, d MMMM yyyy");
    } catch {
      return weddingDate;
    }
  })();

  return (
    <footer className="py-16 bg-ivory text-center relative">
      <div className="royal-divider w-40 mx-auto mb-8" />
      
      <h3 className="font-script text-4xl md:text-5xl gold-text-gradient mb-2">
        {brideName}
      </h3>
      <span className="text-2xl">❤️</span>
      <h3 className="font-script text-4xl md:text-5xl gold-text-gradient mt-2 mb-6">
        {groomName}
      </h3>

      <p className="font-display text-sm tracking-[0.15em] text-maroon mb-4">
        {formattedDate}
      </p>

      <p className="font-elegant text-lg italic text-muted-foreground max-w-md mx-auto mb-8">
        "Thank you for being part of our special day."
      </p>

      <div className="royal-divider w-24 mx-auto mb-4" />
      <p className="font-elegant text-sm text-muted-foreground">
        Made with love ✦ A Royal Celebration
      </p>
    </footer>
  );
};

export default WeddingFooter;
