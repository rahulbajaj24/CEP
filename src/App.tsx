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
      <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] animate-bg-pulse">
        <div className="relative">
          {/* Subtle glow behind the logo */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          
          <img 
            src="/adhar-brand-icon.jpeg" 
            alt="ADHAR Logo" 
            className="w-32 h-32 relative z-10 animate-reveal shadow-2xl rounded-2xl" 
          />
        </div>
        
        <h1 className="mt-8 text-3xl font-bold tracking-widest text-primary animate-pulse">
          ADHAR
        </h1>
        <div className="mt-2 h-1 w-12 bg-secondary rounded-full animate-bounce" />
        
        <p className="mt-4 text-slate-400 text-sm font-light tracking-[0.2em] uppercase">
          Khamgaon Community Project
        </p>
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