import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InvitationNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="royal-divider w-24 mx-auto mb-8" />
        <h1 className="font-script text-5xl md:text-6xl gold-text-gradient mb-6">
          Oops!
        </h1>
        <p className="font-display text-lg text-maroon tracking-[0.1em] mb-4">
          Invitation Not Found
        </p>
        <p className="font-elegant text-lg text-muted-foreground italic mb-8">
          The invitation you are looking for does not exist or may have been removed.
        </p>
        <div className="royal-divider w-24 mx-auto mb-8" />
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 font-display text-sm tracking-[0.2em] uppercase gold-shine rounded-sm border-2 border-royal-gold-light cursor-pointer"
          style={{ color: "hsl(345, 80%, 10%)" }}
        >
          Go Home
        </button>
      </motion.div>
    </div>
  );
};

export default InvitationNotFound;
