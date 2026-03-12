import HeroSection from "@/components/HeroSection";
import SaveTheDate from "@/components/SaveTheDate";
import Countdown from "@/components/Countdown";
import WeddingEvents from "@/components/WeddingEvents";
import Gallery from "@/components/Gallery";
import BackgroundMusic from "@/components/BackgroundMusic";
import RSVPSection from "@/components/RSVPSection";
import WeddingFooter from "@/components/WeddingFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-ivory overflow-hidden">

      <HeroSection />
      <SaveTheDate />
      <Countdown />
      <WeddingEvents />
      <Gallery />
      <RSVPSection />
      <WeddingFooter />
      <BackgroundMusic />

    </div>
  );
};

export default Index;