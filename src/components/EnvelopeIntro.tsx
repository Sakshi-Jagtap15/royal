import { motion } from "framer-motion"
import { useState } from "react"

interface Props {
  onOpen: () => void
}

const EnvelopeIntro = ({ onOpen }: Props) => {

  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(true)

    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">

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
          duration: 1.4,
          ease: "easeInOut"
        }}
      />

      {!opened && (
        <p className="absolute bottom-24 text-white text-xl tracking-widest">
          Tap to open invitation
        </p>
      )}

    </div>
  )
}

export default EnvelopeIntro