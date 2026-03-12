import { motion } from "framer-motion";
import { useState } from "react";

export default function InvitationCard({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f8f4ee] z-50">

      {/* Card container */}
      <motion.div
        className="relative w-[320px] h-[220px] cursor-pointer"
        onClick={handleOpen}
      >

        {/* Card base */}
        <div className="absolute inset-0 bg-white shadow-2xl rounded-md border border-[#e5d7c6]" />

        {/* Card flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[110px] bg-[#b41f2a] origin-top rounded-t-md"
          animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: 1 }}
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Text */}
        {!opened && (
          <div className="absolute inset-0 flex items-center justify-center text-lg font-serif text-[#b41f2a]">
            Open Invitation
          </div>
        )}
      </motion.div>
    </div>
  );
}