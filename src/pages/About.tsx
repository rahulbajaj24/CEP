import { Heart, Target, Eye, Shield, Users, Lightbulb } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion", desc: "We lead with empathy and care for every child and woman in our shelter." },
  { icon: Shield, title: "Integrity", desc: "Transparency and honesty in everything we do — every rupee accounted for." },
  { icon: Users, title: "Community", desc: "Building strong bonds between children and the society around them." },
  { icon: Lightbulb, title: "Empowerment", desc: "Equipping children with skills and confidence to become self-reliant." },
];

const team = [
  { name: "Vaidya Parshuram Y. Khadilwale", role: "Founder", bio: "Inspired by witnessing an abandoned newborn, he dedicated his life to orphaned children." },
  { name: "Shri Krishnakrishna Damle", role: "Co-Founder & Trustee", bio: "Donated land in Akurdi, Pune, to establish the ADHAR shelter." },
  { name: "Shri Vasant Bhave", role: "Co-Founder & Trustee", bio: "Co-donated the land and supported the foundation of ADHAR." },
];

const About = () => {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About ADHAR</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Over 30 years of compassion, dedication, and transforming lives in Pune.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ADHAR was founded on <strong className="text-foreground">28th March 1991</strong> as a public charitable trust. The inspiration came when <strong className="text-foreground">Vaidya Parshuram Yashwant Vaidya Khadilwale</strong> witnessed an abandoned newborn in a Mumbai slum and resolved to dedicate his life to helping orphaned and destitute children.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With the support of his friends <strong className="text-foreground">Shri Krishnakrishna Damle</strong> and <strong className="text-foreground">Shri Vasant Bhave</strong>, who donated two plots of land in Akurdi, Pune, the foundation of ADHAR was established.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Since then, the organization has worked toward providing shelter, care, protection, and opportunities for vulnerable children and women. Recognized by the Government of Maharashtra and registered with the Charity Commissioner (Reg. No. E-1442), ADHAR continues to serve with unwavering commitment.
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
              To provide a safe home, quality care, and a brighter future for orphaned and destitute children while empowering them to become confident, independent members of society.
            </p>
          </div>
          <div className="bg-card rounded-xl p-10 shadow-sm border border-border">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              A world where every child is protected, educated, and given equal opportunity to thrive — regardless of their circumstances.
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

      {/* Registration Info */}
      <section className="section-padding bg-muted">
        <div className="container-narrow max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Registration & Recognition</h2>
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3 items-start">
                <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>Recognized by the <strong className="text-foreground">Government of Maharashtra</strong> for orphaned and destitute children and women.</span>
              </li>
              <li className="flex gap-3 items-start">
                <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>Registered with the <strong className="text-foreground">Charity Commissioner</strong> (Reg. No. E-1442).</span>
              </li>
              <li className="flex gap-3 items-start">
                <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>Under the <strong className="text-foreground">Commissionerate of Women and Child Development</strong>, Pune.</span>
              </li>
              <li className="flex gap-3 items-start">
                <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>Registered under <strong className="text-foreground">Section 80G</strong> for tax-exempt donations.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
