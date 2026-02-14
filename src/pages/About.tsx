import { Heart, Target, Eye, Shield, Users, Lightbulb } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion", desc: "We lead with empathy and care for every child." },
  { icon: Shield, title: "Integrity", desc: "Transparency and honesty in everything we do." },
  { icon: Users, title: "Community", desc: "Building strong bonds between children and society." },
  { icon: Lightbulb, title: "Innovation", desc: "Finding new ways to create lasting impact." },
];

const team = [
  { name: "Dr. Meera Gupta", role: "Founder & Director", bio: "20+ years in child welfare and social work." },
  { name: "Arjun Patel", role: "Program Manager", bio: "Specialist in education and community development." },
  { name: "Sanya Reddy", role: "Operations Head", bio: "Expert in NGO operations and fundraising." },
  { name: "Vikram Singh", role: "Volunteer Coordinator", bio: "Passionate about connecting people with purpose." },
];

const About = () => {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About ADHAR</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Our journey of compassion, dedication, and transforming lives.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2010, ADHAR began as a small shelter for 15 orphaned children in New Delhi. What started as one person's dream to make a difference has grown into a nationwide movement touching thousands of lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, ADHAR supports over 2,500 children across multiple centers, providing education, healthcare, nutrition, and most importantly — a loving home. Our commitment remains unchanged: every child deserves a chance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container-narrow grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-10 shadow-sm border border-border">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide a safe, nurturing environment for orphaned and underprivileged children, empowering them through education, healthcare, and life skills to become confident, self-reliant individuals.
            </p>
          </div>
          <div className="bg-card rounded-xl p-10 shadow-sm border border-border">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              A world where every child, regardless of their circumstances, has equal access to love, education, and the opportunity to build a bright future for themselves and their community.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{v.title}</h4>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-sm border border-border text-center hover-lift">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">{member.name}</h4>
                <p className="text-secondary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
