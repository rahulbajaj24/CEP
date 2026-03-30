"use client"; // MUST be the very first line
import React from 'react';
import { CldImage } from 'next-cloudinary';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, Users, GraduationCap, ShieldCheck, ArrowRight, 
  Star, Quote, BadgeCheck, Clock, IndianRupee 
} from "lucide-react";

const stats = [
  { icon: Heart, label: "Children Supported", value: "2,500+" },
  { icon: Users, label: "Volunteers", value: "800+" },
  { icon: GraduationCap, label: "Successful Educations", value: "1,200+" },
  { icon: IndianRupee, label: "Donations Raised", value: "₹5Cr+" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Government Recognized" },
  { icon: BadgeCheck, label: "80G Tax Benefits" },
  { icon: Clock, label: "Established in 1991" },
  { icon: Star, label: "Over 30 Years of Service" },
];

const programs = [
  { title: "Child Education", desc: "Quality schooling, tuition support, and learning resources for children of all ages." },
  { title: "Food & Nutrition", desc: "Three nutritious meals a day to ensure children get balanced diets for their growth." },
  { title: "Healthcare", desc: "Regular health checkups, vaccinations, and medical support for every child in our care." },
];

const testimonials = [
  { name: "Priya Sharma", role: "Regular Donor", text: "ADHAR has transformed the lives of so many children. I'm proud to be a part of this mission." },
  { name: "Rahul Verma", role: "Volunteer", text: "Volunteering at ADHAR was the most fulfilling experience of my life. Every child's smile is worth it." },
  { name: "Dr. Anita Kapoor", role: "Board Member", text: "The transparency and dedication of the ADHAR team is unmatched. Every rupee makes an impact." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
<img 
  src="https://res.cloudinary.com/ds4mv1g3e/image/upload/f_auto,q_auto/v1/hero-bg.jpg_p2ales" 
  alt="ADHAR - Empowering Futures"
  className="w-full h-screen object-cover" 
  loading="eager"
  style={{ display: 'block' }} // Ensures it's not hidden by layout
/>
  <div className="absolute inset-0 bg-black/30 z-10" />

  <div className="relative z-20 w-full px-6 md:px-12 lg:px-24">
    <div className="max-w-3xl text-white">
      <span className="inline-block bg-secondary px-4 py-1 rounded-full text-sm font-bold mb-6">
        Empowering Lives Since 1991
      </span>
      <h1 className="text-4xl md:text-7xl font-bold mb-6">
        30+ Years of <span className="text-secondary">Changing Lives.</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-xl">
        ADHAR is a Government-recognized trust providing shelter, education, and love to orphaned and destitute children in Nigdi, Pune.
      </p>
      <div className="flex gap-4">
        <Link to="/donate">
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
  <Link to="/donate">
    {/* Solid Orange Button */}
    <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
  {/* Donate Now Button */}
  <Link to="/donate">
    <Button size="lg" className="bg-secondary text-white hover:bg-orange-600 px-8 rounded-full font-bold shadow-lg h-12 transition-all hover:scale-105">
      <Heart className="w-4 h-4 mr-2 fill-white" />
      Donate Now
    </Button>
  </Link>

  {/* Volunteer Button */}
  <Link to="/volunteer">
    <Button size="lg" className="bg-secondary text-white hover:bg-orange-600 px-8 rounded-full font-bold shadow-lg h-12 transition-all hover:scale-105">
      Volunteer
    </Button>
  </Link>

  {/* Visit Us Button */}
  <Link to="/contact">
    <Button size="lg" className="bg-secondary text-white hover:bg-orange-600 px-8 rounded-full font-bold shadow-lg h-12 transition-all hover:scale-105">
      Visit Us
    </Button>
  </Link>
</div>
  </Link>
</div>
        </Link>
      </div>
    </div>
  </div>
</section>
      {/* About Preview */}
      <section className="w-full py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Who We Are</h2>
          <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
            ADHAR is a public charitable trust founded on 28th March 1991, recognized by the Government of Maharashtra for the welfare of orphaned and destitute children and women. 
          </p>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Located in Nigdi, Pune, ADHAR has been providing shelter, care, protection, and opportunities for vulnerable children and women for over three decades.
          </p>
          <Link to="/about">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
              Learn More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-20 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="w-full py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Programs</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Comprehensive programs designed for the holistic development of every child.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{prog.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your small help can change a life.</h2>
          <p className="text-white/90 text-lg mb-10">
            Every donation brings hope and a smile to a child's face. All donations are eligible for 80G tax benefits.
          </p>
          <Link to="/donate">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold px-12 h-14 rounded-full text-lg shadow-xl">
              <Heart className="w-6 h-6 mr-2" /> Donate Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-border relative">
                <Quote className="w-10 h-10 text-secondary/10 absolute top-6 right-6" />
                <p className="text-slate-600 italic mb-8 relative z-10">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-400 font-medium">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;