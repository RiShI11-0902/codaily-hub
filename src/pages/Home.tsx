import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Code, Zap, Users, Star, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Code,
      title: "Daily Challenges",
      description: "Fresh coding problems delivered every day to keep your skills sharp.",
    },
    {
      icon: Zap,
      title: "Curated Packs",
      description: "Themed problem sets designed to master specific topics and patterns.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Learn from peers and share solutions with a vibrant coding community.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Visualize your journey with detailed analytics and leaderboards.",
    },
  ];

  const packs = [
    { name: "Array Mastery", problems: 50, rating: 4.8 },
    { name: "Dynamic Programming", problems: 40, rating: 4.9 },
    { name: "System Design", problems: 30, rating: 4.7 },
    { name: "Graph Algorithms", problems: 45, rating: 4.8 },
  ];

  const steps = [
    { step: "1", title: "Sign Up", description: "Create your free account in seconds" },
    { step: "2", title: "Choose Pack", description: "Select from curated problem collections" },
    { step: "3", title: "Code Daily", description: "Solve challenges and track your progress" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "2CodeDaily transformed my interview prep. The structured packs are phenomenal!",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      content: "Daily challenges keep me sharp. Best coding practice platform I've used.",
      avatar: "MR",
    },
    {
      name: "Emily Thompson",
      role: "CS Student",
      content: "The progression system and analytics help me stay motivated and track improvement.",
      avatar: "ET",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-heading">
              Master Coding with Daily Practice
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Elevate your programming skills with curated challenges and structured learning paths
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-heading">
            Why Choose 2CodeDaily?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to become a better programmer, all in one place
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-heading">
            Popular Packs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack, index) => (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{pack.name}</h3>
                  <p className="text-muted-foreground mb-4">{pack.problems} Problems</p>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{pack.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-heading">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary via-primary to-accent flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-heading">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary via-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Start Coding?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers improving their skills with 2CodeDaily
          </p>
          <Button size="lg" variant="secondary" className="text-lg">
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
