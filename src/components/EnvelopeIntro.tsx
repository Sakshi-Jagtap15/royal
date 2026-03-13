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
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

      <div className="envelope-scene">

        <div className="relative w-[420px]">

          {/* Base Envelope */}
          <img
            src="/envelope.png"
            className="w-full relative z-10"
          />

          {/* Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 envelope-flap z-20"
            initial={{ rotateX: 0 }}
            animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full bg-[#efe9dc] border-b border-gray-300 clip-envelope" />
          </motion.div>

          {/* Wax Seal */}
          <motion.div
            className="absolute top-[45%] left-1/2 -translate-x-1/2 z-30"
            animate={opened ? { scale: 0, opacity: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-red-700 rounded-full shadow-lg" />
          </motion.div>

          {/* Click Layer */}
          {!opened && (
            <div
              className="absolute inset-0 z-40 cursor-pointer"
              onClick={handleOpen}
            />
          )}

        </div>

        {!opened && (
          <p className="text-white text-center mt-6 text-lg">
            Tap to open invitation
          </p>
        )}

      </div>

    </div>
  )
}

export default EnvelopeIntro