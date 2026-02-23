import { Link } from "react-router-dom";
import { Heart, Users, GraduationCap, ShieldCheck, ArrowRight, Star, Quote, BadgeCheck, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div>
      {}
      <section className=" px-4 sm:px-6 lg:px-8 relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
         <div className="relative w-full h-[50vh] md:h-screen overflow-hidden bg-white">
  <img 
    src="/hero-bg.png" 
    alt="ADHAR Community" 
    className="absolute inset-0 w-full h-full object-contain md:object-contain md:object-cover z-0" 
  />
  {}
{/* --- HERO SECTION START --- */}
      <section className="relative w-full min-h-[80vh] md:h-screen flex items-center overflow-hidden">
        {/* Background Image Logic */}
        <img 
          src="/hero-bg.png" 
          alt="ADHAR Community" 
          className="absolute inset-0 w-full h-full object-contain md:object-contain md:object-cover z-0" 
        />
        
        {/* Subtle Gradient Overlay - keeps it professional but bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent z-10" />

        <div className="relative z-20 w-full px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            <span className="inline-block bg-secondary text-white rounded-full px-4 py-1.5 text-sm font-bold mb-6 animate-fade-in">
              Empowering Lives Since 1991
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-md">
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
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-primary font-bold px-8 rounded-full">
                  Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* --- HERO SECTION END --- */}

      {/* Trust Badges */}
      <section className=" px-4 sm:px-6 lg:px-8 bg-card border-b border-border py-6">
        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary/5">
                <badge.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className=" px-4 sm:px-6 lg:px-8 section-padding bg-background">
        <div className=" text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Are</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            ADHAR is a public charitable trust founded on 28th March 1991, recognized by the Government of Maharashtra for the welfare of orphaned and destitute children and women. Registered with the Charity Commissioner (Reg. No. E-1442) and under Section 80G for tax-exempt donations.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Located in Akurdi, Pune, ADHAR has been providing shelter, care, protection, and opportunities for vulnerable children and women for over three decades.
          </p>
          <Link to="/about">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Learn More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className=" px-4 sm:px-6 lg:px-8 section-padding bg-primary">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-count-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className=" px-4 sm:px-6 lg:px-8 section-padding bg-background">
        <div className="">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Programs</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Comprehensive programs designed for the holistic development of every child in our care.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
              <div key={i} className="bg-card rounded-xl p-8 shadow-sm border border-border hover-lift">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{prog.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/programs">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Programs <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className=" px-4 sm:px-6 lg:px-8 section-padding bg-secondary">
        <div className=" text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Your small help can change a life.
          </h2>
          <p className="text-secondary-foreground/80 max-w-xl mx-auto mb-8">
            Every donation, no matter how small, brings hope and a smile to a child's face. All donations are eligible for 80G tax benefits.
          </p>
          <Link to="/donate">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-10">
              <Heart className="w-5 h-5 mr-2" /> Donate Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className=" px-4 sm:px-6 lg:px-8 section-padding bg-muted">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <Quote className="w-8 h-8 text-secondary/40 mb-4" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
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
