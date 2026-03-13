import { motion } from "framer-motion"
import { useState, useRef } from "react"

interface Props {
  onOpen: () => void
}

const EnvelopeIntro = ({ onOpen }: Props) => {

  const [opened, setOpened] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleOpen = () => {

    setOpened(true)

    // play music
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }

    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/music/wedding.mp3" type="audio/mpeg" />
      </audio>

      {/* Envelope Container */}
      <div className="relative">

        {/* Envelope */}
        <motion.img
          src="/envelope.png"
          alt="Invitation"
          className="cursor-pointer w-[90vw] max-w-[900px]"
          onClick={handleOpen}

          initial={{
            scale: 1,
            rotateX: 0
          }}

          animate={
            opened
              ? {
                  scale: 3,
                  y: -200,
                  opacity: 0
                }
              : {}
          }

          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
        />

        {/* Wax Seal */}
        <motion.div
          className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-20"
          animate={opened ? { scale: 0, opacity: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          
        </motion.div>

      </div>

      {!opened && (
        <p className="absolute bottom-24 text-white text-xl tracking-widest">
          Tap to open invitation
        </p>
      )}

    </div>
  )
}

export default EnvelopeIntro