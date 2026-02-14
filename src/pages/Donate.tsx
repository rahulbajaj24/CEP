import { Heart, Shield, Eye, BookOpen, Utensils, GraduationCap, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  { amount: "₹500", label: "School Supplies", desc: "Provide books, stationery, and bags for a child.", icon: BookOpen },
  { amount: "₹1,000", label: "Monthly Meals", desc: "Feed a child nutritious meals for an entire month.", icon: Utensils },
  { amount: "₹5,000", label: "Sponsor a Child", desc: "Cover education, food, and healthcare for a child.", icon: GraduationCap },
];

const Donate = () => {
  const { toast } = useToast();

  const handleDonate = (tier: string) => {
    toast({
      title: "Thank you for your generosity!",
      description: `You selected the ${tier} tier. Payment gateway coming soon.`,
    });
  };

  return (
    <div>
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Make a Donation</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Every contribution creates ripples of positive change in a child's life. All donations are eligible for 80G tax benefits.
          </p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-card border-b border-border py-6">
        <div className="container-narrow">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "Government Recognized",
              "80G Tax Benefits",
              "Established 1991",
              "Reg. No. E-1442",
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Donations Help */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">How Your Donation Helps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Your donations directly support orphaned and destitute children at ADHAR's shelter in Akurdi, Pune. We maintain complete transparency with quarterly reports and audits available to all donors.
          </p>

          {/* Transparency */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">100% Transparent</h3>
              <p className="text-muted-foreground text-sm">Every rupee is accounted for with detailed reports. Registered under Charity Commissioner.</p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <Eye className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">80G Tax Benefits</h3>
              <p className="text-muted-foreground text-sm">All donations are eligible for tax deduction under Section 80G of the Income Tax Act.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Choose a Donation Tier</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`bg-card rounded-xl p-8 shadow-sm border border-border text-center hover-lift ${
                  i === 2 ? "ring-2 ring-secondary" : ""
                }`}
              >
                {i === 2 && (
                  <span className="inline-block bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <tier.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{tier.amount}</div>
                <div className="text-secondary font-semibold mb-3">{tier.label}</div>
                <p className="text-muted-foreground text-sm mb-6">{tier.desc}</p>
                <Button
                  onClick={() => handleDonate(tier.label)}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
                >
                  <Heart className="w-4 h-4 mr-2" /> Donate {tier.amount}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Donations */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Donate via Bank Transfer</h2>
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <p className="text-muted-foreground text-sm mb-6 text-center">
              For bank transfer details or to discuss larger donations, please contact us directly:
            </p>
            <div className="space-y-4 text-sm">
              {[
                ["Organization", "ADHAR Foundation"],
                ["Registration", "Charity Commissioner Reg. No. E-1442"],
                ["Tax Benefits", "80G Certified — Tax Deduction Available"],
                ["Phone", "020-27656257"],
                ["Address", "Madhav Smruti, Akurdi, Pune – 411044"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
