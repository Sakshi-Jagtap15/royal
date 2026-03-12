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
      onFinish();
    };

    video.addEventListener("ended", handleEnd);

    return () => {
      video.removeEventListener("ended", handleEnd);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{ mixBlendMode: "screen" }}
      >
        <source src="/curtains.mp4" type="video/mp4" />
      </video>
    </div>
  );
}