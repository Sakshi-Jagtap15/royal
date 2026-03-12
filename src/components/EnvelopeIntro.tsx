import { motion } from "framer-motion"

interface Props {
  onOpen: () => void
}

const EnvelopeIntro = ({ onOpen }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-ivory z-50">

      <div className="text-center">

        {/* Envelope */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-72 h-44 bg-white border border-gray-300 relative mx-auto shadow-lg"
        >

          {/* Envelope flap */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-200 clip-envelope"></div>

        </motion.div>

        <p className="mt-6 font-elegant text-maroon">
          Invitation
        </p>

        <button
          onClick={onOpen}
          className="mt-6 px-6 py-3 bg-maroon text-royal-gold rounded-full"
        >
          Open Invitation
        </button>

      </div>
    </div>
  )
}

export default EnvelopeIntro