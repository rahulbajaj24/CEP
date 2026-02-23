import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

 const quotes = [
    "Empowering Lives, Building Futures.",
    "Small Acts, Big Impact.",
    "Every Child Deserves a Home.",
    "Nurturing Hope Since 1991.",
    "Spreading Smiles in Nigdi, Pune.",
    "Education is the Foundation of Life."
  ];

  // Pick a random quote only once per refresh
  const randomQuote = React.useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-[9999]">
        <div className="flex flex-col items-center max-w-xs text-center">
          {/* Animated SVG Icon */}
          <div className="w-24 h-24 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-secondary animate-draw">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" />
              <path className="animate-beat text-red-400 fill-red-400" d="M12 18.5s-4.5-2.5-4.5-5.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0c0 3-4.5 5.5-4.5 5.5z" />
            </svg>
          </div>

          {/* Branding */}
          <div className="opacity-0 animate-fade-slide" style={{ animationDelay: '0.4s' }}>
            <h1 className="text-3xl font-bold tracking-[0.3em] text-slate-800 uppercase">ADHAR</h1>
            <p className="text-xs text-slate-400 font-medium tracking-[0.2em] mt-1 mb-4">NIGDI, PUNE • SINCE 1991</p>
            <div className="h-[2px] w-8 bg-secondary mx-auto mb-6 rounded-full" />
          </div>

          {/* Dynamic Quote */}
          <div className="opacity-0 animate-fade-slide px-4" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm italic font-serif text-slate-500 leading-relaxed tracking-wide">
              "{randomQuote}"
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;