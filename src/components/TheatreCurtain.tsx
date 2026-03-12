import { motion } from "framer-motion";

interface Props {
  onFinish: () => void;
}

export default function TheatreCurtain({ onFinish }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">

      {/* Left curtain */}
      <motion.div
        className="w-1/2 h-full bg-[url('/curtain.jpg')] bg-cover bg-right"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onAnimationComplete={onFinish}
      />

      {/* Right curtain */}
      <motion.div
        className="w-1/2 h-full bg-[url('/curtain.jpg')] bg-cover bg-left"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

    </div>
  );
}