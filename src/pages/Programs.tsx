import { GraduationCap, Utensils, HeartPulse, Home, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: GraduationCap,
    title: "Child Education",
    desc: "Quality schooling, tuition support, and learning resources for children of all ages. We partner with schools to ensure every child gets access to formal education.",
  },
  {
    icon: Utensils,
    title: "Food & Nutrition",
    desc: "Three nutritious meals a day prepared with care. Our nutrition programs ensure children get balanced diets essential for their growth and development.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    desc: "Regular health checkups, vaccinations, and medical support. We have partnerships with hospitals to provide quality healthcare to every child.",
  },
  {
    icon: Home,
    title: "Shelter Support",
    desc: "Safe, clean, and loving living spaces for children. Our shelters are designed to feel like home, fostering a sense of belonging and security.",
  },
  {
    icon: Wrench,
    title: "Skill Development",
    desc: "Vocational training, computer literacy, and life skills workshops that prepare older children for independent and successful futures.",
  },
];

const Programs = () => {
  return (
    <div>
      <section className="bg-primary section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Programs</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Comprehensive programs designed for the holistic development of every child.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-8 shadow-sm border border-border hover-lift group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-secondary/10 flex items-center justify-center mb-6 transition-colors">
                  <prog.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{prog.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{prog.desc}</p>
                <Button variant="ghost" className="text-primary hover:text-secondary p-0 h-auto font-medium text-sm">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
