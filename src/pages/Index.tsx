import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Home, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <img 
          src="/hero-bg.png" 
          alt="ADHAR Community" 
          className="absolute inset-0 w-full h-full object-contain md:object-cover z-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent z-10" />

        <div className="relative z-20 w-full px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            <span className="inline-block bg-secondary text-white rounded-full px-4 py-1.5 text-sm font-bold mb-6">
              Empowering Lives Since 1991
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              30+ Years of Changing Lives. <br />
              <span className="text-secondary">Be the reason a child smiles today.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl drop-shadow-sm">
              ADHAR is a Government-recognized trust providing shelter, education, and love to orphaned and destitute children in Nigdi, Pune.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate">
                <Button size="lg" className="bg-secondary text-white hover:bg-orange-600 font-bold px-8 rounded-full shadow-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-slate-900 font-bold px-8 rounded-full">
                  Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Restored and Responsive) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <div className="text-slate-600 font-medium">Years of Service</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-slate-600 font-medium">Children Impacted</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-slate-600 font-medium">Education Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-slate-600 font-medium">Care & Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;