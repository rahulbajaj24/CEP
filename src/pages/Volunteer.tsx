import { useState } from "react";
import { API_BASE_URL } from "@/config/api";
import { Heart, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const INTEREST_OPTIONS = ["Education", "Healthcare", "Food"] as const;

const Volunteer = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    location: "Nigdi",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\+?\d{10,15}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "Invalid phone number";
    if (!form.interest) errs.interest = "Please select an area of interest";
    if (!emailVerified) errs.email = "Please verify your email first";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendOTP = async () => {
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email first" }));
      return;
    }

    setOtpLoading(true);
    setErrors((prev) => ({ ...prev, email: "", otp: "" }));

    try {
      const res = await fetch(`${API_BASE_URL}/api/volunteer/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        toast({
          title: "OTP Sent!",
          description: `Verification code sent to ${form.email}`,
        });
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to send OTP", variant: "destructive" });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setEmailVerified(true);
      setErrors((prev) => ({ ...prev, email: "" }));
      toast({
        title: "Email Verified ✅",
        description: "Your email has been verified. You can now submit the form.",
      });
    } else {
      setErrors((prev) => ({ ...prev, otp: "Please enter a valid 6-digit OTP" }));
    }
  };

  const handleEmailChange = (email: string) => {
    setForm({ ...form, email });
    // Reset verification if email changes
    if (otpSent || emailVerified) {
      setOtpSent(false);
      setEmailVerified(false);
      setOtp("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/volunteer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Thank you for volunteering!",
          description: data.message || "Registration complete!",
        });
        setForm({ name: "", email: "", phone: "", interest: "", location: "Nigdi" });
        setOtp("");
        setOtpSent(false);
        setEmailVerified(false);
        setErrors({});
      } else {
        toast({ title: "Registration failed", description: data.message, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not connect to server.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Become a Volunteer</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Be the reason a child smiles today.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow max-w-2xl">
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-sm border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Volunteer Registration</h2>
              <p className="text-muted-foreground text-sm mt-2">Fill in the form below to join our mission.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" id="volunteer-form">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email with OTP verification */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="john@example.com"
                    className={`flex-1 ${errors.email ? "border-destructive" : ""} ${emailVerified ? "border-green-500" : ""}`}
                    disabled={emailVerified}
                  />
                  {!emailVerified ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSendOTP}
                      disabled={otpLoading || !form.email}
                      className="shrink-0 gap-1.5 h-10"
                      id="send-otp-btn"
                    >
                      {otpLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      {otpSent ? "Resend" : "Verify"}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium shrink-0 px-3">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </div>
                  )}
                </div>
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>

              {/* OTP input — shown after sending OTP */}
              {otpSent && !emailVerified && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-blue-700 font-medium">
                    📩 Enter the 6-digit code sent to {form.email}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      id="otp-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      className={`text-center text-lg tracking-[0.3em] font-mono font-bold flex-1 ${errors.otp ? "border-destructive" : ""}`}
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6}
                      className="shrink-0 bg-blue-600 hover:bg-blue-700"
                      id="verify-otp-btn"
                    >
                      Verify Code
                    </Button>
                  </div>
                  {errors.otp && <p className="text-destructive text-xs">{errors.otp}</p>}
                  <p className="text-xs text-blue-500">Code expires in 5 minutes</p>
                </div>
              )}

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="interest">Area of Interest</Label>
                <select
                  id="interest"
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    errors.interest ? "border-destructive" : "border-input"
                  }`}
                >
                  <option value="" disabled>Select your interest</option>
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.interest && <p className="text-destructive text-xs mt-1">{errors.interest}</p>}
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Nigdi"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
                disabled={loading || !emailVerified}
                id="volunteer-submit"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
              {!emailVerified && (
                <p className="text-center text-xs text-muted-foreground">
                  Please verify your email before submitting.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
