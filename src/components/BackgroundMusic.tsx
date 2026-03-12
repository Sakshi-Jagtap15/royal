import { useEffect, useRef } from "react"

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const playMusic = () => {
      audioRef.current?.play().catch(() => {})
    }

    document.addEventListener("click", playMusic)

    return () => {
      document.removeEventListener("click", playMusic)
    }
  }, [])

  return (
    <audio ref={audioRef} loop>
      <source src="/music/wedding-music.mp3" type="audio/mpeg" />
    </audio>
  )
}

export default BackgroundMusic