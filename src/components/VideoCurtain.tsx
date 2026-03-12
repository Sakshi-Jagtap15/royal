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
  className="fixed inset-0 w-full h-full object-cover z-50 pointer-events-none"
  style={{
    filter: "brightness(1.2) contrast(1.3) saturate(0.8)",
    mixBlendMode: "darken"
  }}
>
  <source src="/curtains.mp4" type="video/mp4" />
</video>
    </div>
  );
}