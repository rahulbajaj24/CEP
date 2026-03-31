import { useState, useEffect } from "react";
import { Users, RefreshCw, MapPin, Mail, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  location: string;
  createdAt: string;
}

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVolunteers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3002/api/volunteer");
      const data = await res.json();
      if (data.success) {
        setVolunteers(data.data);
      } else {
        setError(data.message || "Failed to fetch volunteers");
      }
    } catch {
      setError("Could not connect to server. Make sure the server is running on port 3002.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const interestColor: Record<string, string> = {
    Education: "bg-blue-100 text-blue-700 border-blue-200",
    Healthcare: "bg-green-100 text-green-700 border-green-200",
    Food: "bg-orange-100 text-orange-700 border-orange-200",
  };

  return (
    <div>
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Registered Volunteers
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            All community members who have signed up to volunteer.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {volunteers.length} Volunteer{volunteers.length !== 1 ? "s" : ""}
                </h2>
                <p className="text-muted-foreground text-sm">registered so far</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchVolunteers}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-4 mb-6 text-sm">
              {error}
            </div>
          )}

          {loading && volunteers.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 opacity-50" />
              <p>Loading volunteers...</p>
            </div>
          ) : volunteers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No volunteers yet</h3>
              <p className="text-muted-foreground text-sm">
                Registrations will appear here once people sign up.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {volunteers.map((v) => (
                <div
                  key={v._id}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border hover:border-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-foreground text-lg">{v.name}</h3>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        interestColor[v.interest] || "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {v.interest}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{v.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{v.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{v.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Registered {new Date(v.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VolunteerList;
