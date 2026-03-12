import { motion } from "framer-motion"

interface Props {
  onOpen: () => void
}

const EnvelopeIntro = ({ onOpen }: Props) => {
  return (
    <div className="fixed inset-0 bg-ivory flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >

        <div className="w-[280px] mx-auto mb-6">
          <img
            src="/envelope.png"
            alt="Invitation"
            className="w-full"
          />
        </div>

        <button
          onClick={onOpen}
          className="px-6 py-3 bg-deep-maroon text-royal-gold rounded-full"
        >
          Open Invitation
        </button>

      </motion.div>
    </div>
  )
}

export default EnvelopeIntro