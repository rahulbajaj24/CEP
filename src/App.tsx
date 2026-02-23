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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-[9999] p-4">
        {/* Container that scales with screen size */}
        <div className="w-[40vw] h-[40vw] max-w-[250px] max-h-[250px] min-w-[150px] min-h-[150px] flex items-center justify-center relative">
          
          {/* Background Glow that scales */}
          <div className="absolute inset-0 bg-secondary/5 blur-[60px] rounded-full animate-pulse" />
          
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-full h-full text-secondary animate-draw relative z-10"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M9 22V12h6v10" />
            <path 
              className="animate-beat text-red-400 fill-red-400" 
              d="M12 18.5s-4.5-2.5-4.5-5.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0c0 3-4.5 5.5-4.5 5.5z" 
            />
          </svg>
        </div>
        
        {/* Text that adapts to screen width */}
        <div className="text-center space-y-4 mt-8 w-full max-w-md">
          <h2 className="text-[8vw] md:text-4xl font-light tracking-[0.3em] text-slate-800 uppercase animate-fade-in">
            ADHAR
          </h2>
          
          <div className="h-[1px] w-1/3 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
          
          <p className="text-[3vw] md:text-sm text-slate-400 tracking-[0.3em] uppercase px-4 leading-relaxed">
            Providing a Foundation for Life
          </p>
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