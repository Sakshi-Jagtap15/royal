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
    }, 1200)
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.9 }}
        animate={opened ? { scale: 1.2, opacity: 0 } : { scale: 1 }}
        transition={{ duration: 1 }}
        className="cursor-pointer"
        onClick={handleOpen}
      >

        <img
          src="/envelope.png"
          alt="Invitation"
          className="w-[420px] md:w-[520px]"
        />

        {!opened && (
          <p className="text-center text-white mt-6 text-lg">
            Tap to open invitation
          </p>
        )}

      </motion.div>

    </div>
  )
}

export default EnvelopeIntro