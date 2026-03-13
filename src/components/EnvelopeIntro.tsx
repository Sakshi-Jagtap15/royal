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

      {/* Envelope Container */}
      <div className="relative">

        {/* Envelope Image */}
        <motion.img
          src="/envelope.png"
          alt="Invitation"
          onClick={handleOpen}
          className="cursor-pointer w-[90vw] max-w-[900px]"

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

        {/* Wax Seal with Initials */}
        <motion.div
          className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-20"
          animate={opened ? { scale: 0, opacity: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-700 to-red-900 shadow-2xl flex items-center justify-center border-2 border-red-800">

            <span className="text-white text-2xl font-display tracking-widest">
              A & P
            </span>

          </div>
        </motion.div>

      </div>

      {/* Tap Text */}
      {!opened && (
        <p className="absolute bottom-24 text-white text-xl tracking-widest">
          Tap to open invitation
        </p>
      )}

    </div>
  )
}

export default EnvelopeIntro