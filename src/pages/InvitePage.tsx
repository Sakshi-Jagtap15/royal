import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { InvitationData } from "@/types/invitation";
import HeroSection from "@/components/HeroSection";
import SaveTheDate from "@/components/SaveTheDate";
import Countdown from "@/components/Countdown";
import WeddingEvents from "@/components/WeddingEvents";
import Gallery from "@/components/Gallery";
import BackgroundMusic from "@/components/BackgroundMusic";
import RSVPSection from "@/components/RSVPSection";
import WeddingFooter from "@/components/WeddingFooter";
import InvitationNotFound from "./InvitationNotFound";
import EnvelopeIntro from "@/components/EnvelopeIntro";


const InvitePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [opened, setOpened] = useState(false)
 

  useEffect(() => {
  const fetchInvitation = async () => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("slug", slug.trim())
        .single();

      console.log("Slug:", slug);
      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error(error);
        setNotFound(true);
      } else {
        setInvitation(data);
      }

    } catch (err) {
      console.error("Unexpected error:", err);
      setNotFound(true);
    }

    setLoading(false);
  };

  fetchInvitation();
}, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        
        <div className="text-center">
          <div className="royal-divider w-24 mx-auto mb-4" />
          <p className="font-elegant text-lg text-maroon italic animate-pulse">
            Loading your invitation...
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !invitation) {
    return <InvitationNotFound />;
  }

  return (
  <div className="min-h-screen bg-ivory overflow-hidden">

    {!opened && (
      <EnvelopeIntro onOpen={() => setOpened(true)} />
    )}

    {opened && (
      <>
        <HeroSection
          brideName={invitation.bride_name}
          groomName={invitation.groom_name}
          weddingDate={invitation.wedding_date}
          venue={invitation.venue}
          story={invitation.story}
        />

        <SaveTheDate weddingDate={invitation.wedding_date} />
        <Countdown weddingDate={invitation.wedding_date} />
        <WeddingEvents />
        <Gallery />
        <RSVPSection />

        <WeddingFooter
          brideName={invitation.bride_name}
          groomName={invitation.groom_name}
          weddingDate={invitation.wedding_date}
        />

        <BackgroundMusic />
      </>
    )}

  </div>
)
};

export default InvitePage;
