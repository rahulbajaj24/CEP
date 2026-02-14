import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div>
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            We'd love to hear from you. Visit us or reach out anytime.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Address</div>
                  <div className="text-muted-foreground text-sm">
                    "Madhav Smruti"<br />
                    Plot No. 48 & 49, Sector 27,<br />
                    Janata Vasahat,<br />
                    Near New Ram Mandir, Pradhikaran,<br />
                    Near Akurdi Railway Station,<br />
                    Pune – 411044
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Phone</div>
                  <div className="text-muted-foreground text-sm">020-27656257</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Registration</div>
                  <div className="text-muted-foreground text-sm">
                    Charity Commissioner Reg. No. E-1442<br />
                    80G Certified for Tax Benefits
                  </div>
                </div>
              </div>

              {/* Map - Akurdi, Pune */}
              <div className="rounded-xl overflow-hidden border border-border mt-6">
                <iframe
                  title="ADHAR Location - Akurdi, Pune"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.1!2d73.7657!3d18.6492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c8fa205%3A0x0!2zMTjCsDM4JzU3LjEiTiA3M8KwNDUnNTYuNSJF!5e0!3m2!1sen!2sin!4v1600000000000"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-8 md:p-10 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Your email"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Subject (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Your message..."
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
