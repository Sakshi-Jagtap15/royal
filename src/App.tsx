import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InvitePage from "./pages/InvitePage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

import { useState } from "react";
import CurtainOverlay from "./components/CurtainOverlay";
import HeroSection from "./components/HeroSection";

function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {/* Hero is always rendered */}
      <HeroSection />

      {/* Curtain sits on top */}
      {!opened && (
        <CurtainOverlay onOpen={() => setOpened(true)} />
      )}
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/invite/:slug" element={<InvitePage />} />
          <Route path="/dashboard/:slug" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
