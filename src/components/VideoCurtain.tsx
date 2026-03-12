import { useEffect, useRef } from "react";

interface Props {
  onFinish: () => void;
}

export default function VideoCurtain({ onFinish }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleEnd = () => {
      onFinish(); // reveal site after animation
    };

    video.addEventListener("ended", handleEnd);

    return () => {
      video.removeEventListener("ended", handleEnd);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/curtain-open.mp4" type="video/mp4" />
      </video>
    </div>
  );
}