import { Heart, Shield, Eye, BookOpen, Utensils, GraduationCap } from "lucide-react";
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
            Every contribution creates ripples of positive change in a child's life.
          </p>
        </div>
      </section>

      {/* How Donations Help */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">How Your Donation Helps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            100% of your donation goes directly to the children. We maintain complete transparency with quarterly reports and audits available to all donors.
          </p>

          {/* Transparency */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">100% Transparent</h3>
              <p className="text-muted-foreground text-sm">Every rupee is accounted for with detailed reports.</p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
              <Eye className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Audited Annually</h3>
              <p className="text-muted-foreground text-sm">Independent audits ensure your trust is well placed.</p>
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

      {/* Bank Details */}
      <section className="section-padding bg-background">
        <div className="container-narrow max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Bank Transfer Details</h2>
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
            <div className="space-y-4 text-sm">
              {[
                ["Account Name", "ADHAR Foundation"],
                ["Bank", "State Bank of India"],
                ["Account No.", "1234567890123456"],
                ["IFSC Code", "SBIN0001234"],
                ["Branch", "New Delhi Main Branch"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
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
