import { Link } from "react-router-dom";
import { Heart, Users, GraduationCap, IndianRupee, ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-children.jpg";

const stats = [
  { icon: Heart, label: "Children Supported", value: "2,500+" },
  { icon: Users, label: "Volunteers", value: "800+" },
  { icon: GraduationCap, label: "Successful Educations", value: "1,200+" },
  { icon: IndianRupee, label: "Donations Raised", value: "₹5Cr+" },
];

const programs = [
  { title: "Child Education", desc: "Quality education for every child regardless of their background." },
  { title: "Food & Nutrition", desc: "Ensuring no child goes to bed hungry with nutritious meals." },
  { title: "Healthcare", desc: "Regular health checkups and medical care for all children." },
];

const testimonials = [
  { name: "Priya Sharma", role: "Regular Donor", text: "ADHAR has transformed the lives of so many children. I'm proud to be a part of this mission." },
  { name: "Rahul Verma", role: "Volunteer", text: "Volunteering at ADHAR was the most fulfilling experience of my life. Every child's smile is worth it." },
  { name: "Dr. Anita Kapoor", role: "Board Member", text: "The transparency and dedication of the ADHAR team is unmatched. Every rupee makes an impact." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Happy children at ADHAR" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>
        <div className="relative container-narrow px-4 py-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-secondary/20 text-secondary border border-secondary/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in-up">
              Empowering Lives Since 2010
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Giving every child a chance at a{" "}
              <span className="text-secondary">brighter future.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              ADHAR is committed to providing shelter, education, and love to orphaned children across India.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/donate">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-base px-8">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                  Become a Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Are</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            ADHAR Foundation is a non-profit organization dedicated to transforming the lives of orphaned and underprivileged children. We believe every child deserves love, care, and the opportunity to dream.
          </p>
          <Link to="/about">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Learn More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-primary">
        <div className="container-narrow">
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

      {/* Programs Preview */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Programs</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We run multiple initiatives to ensure holistic development of every child in our care.</p>
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
      <section className="section-padding bg-secondary">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Your small help can change a life.
          </h2>
          <p className="text-secondary-foreground/80 max-w-xl mx-auto mb-8">
            Every donation, no matter how small, brings hope and a smile to a child's face.
          </p>
          <Link to="/donate">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-10">
              <Heart className="w-5 h-5 mr-2" /> Donate Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
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
