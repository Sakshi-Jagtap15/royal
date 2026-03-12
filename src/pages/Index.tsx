import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CurtainOverlay from "@/components/CurtainOverlay";
import HeroSection from "@/components/HeroSection";
import SaveTheDate from "@/components/SaveTheDate";
import Countdown from "@/components/Countdown";
import WeddingEvents from "@/components/WeddingEvents";
import Gallery from "@/components/Gallery";
import BackgroundMusic from "@/components/BackgroundMusic";
import RSVPSection from "@/components/RSVPSection";
import WeddingFooter from "@/components/WeddingFooter";

const Index = () => {
  const [curtainOpen, setCurtainOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory overflow-hidden">
      <AnimatePresence>
        {!curtainOpen && <CurtainOverlay onOpen={() => setCurtainOpen(true)} />}
      </AnimatePresence>

      {curtainOpen && (
        <>
          <HeroSection />
          <SaveTheDate />
          <Countdown />
          <WeddingEvents />
          <Gallery />
          <RSVPSection />
          <WeddingFooter />
          <BackgroundMusic />
        </>
      )}
    </div>
  );
};

export default Index;
