import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Code, Zap, Users, Star, TrendingUp, Video, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Code,
      title: "Practice Coding",
      description: "Solve coding problems and improve your programming skills daily.",
    },
    {
      icon: Zap,
      title: "Explain Your Thought Process",
      description: "Not just code—share your approach and reasoning, just like in real interviews.",
    },
    {
      icon: Users,
      title: "Interview Packs & Leaderboards",
      description: "Compete with peers using language-specific interview packs and see your rank.",
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "Monitor your improvement over time with detailed analytics and performance charts.",
    },
  ];


  const packs = [
    { name: "Array Mastery", problems: 50, rating: 4.8 },
    { name: "Dynamic Programming", problems: 40, rating: 4.9 },
    { name: "System Design", problems: 30, rating: 4.7 },
    { name: "Graph Algorithms", problems: 45, rating: 4.8 },
  ];

  const navigate = useNavigate()

  const interviewPacks = [
    {
      id: 3,
      name: "JavaScript Interview",
      language: "JavaScript",
      questions: 15,
      price: "$5",
      difficulty: "Medium",
      icon: Code
    },
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
              Practise LeetCode like a Pro
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Not just coding—explain your thinking like in real interviews
            </p>
            <a
              href="https://chromewebstore.google.com/detail/2-code-daily/eamejmihabhegokmlajmahmpgkfadphl"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block px-6 py-3 rounded-2xl text-lg font-semibold gradient-heading bg-muted/50 overflow-hidden"
            >
              🚀 Get the Extension

              {/* Animated bottom border */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 hover:text-white bg-gradient-to-r from-teal-300 via-purple-300 to-pink-400 animate-border"></span>
            </a>
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
      <section className=" py-16 text-center  montserrat-heading">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-heading">How It Works</h2>
          <p className=" mb-12 text-primary">Get started in just 4 simple steps!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Register Here", "Download Extension", "Enter Your Email", "Start Interviewing"].map((step, i) => (
              <div key={i} className="bg-text-muted p-6 rounded-lg shadow-sm hover:shadow-2xl transform hover:-translate-y-2 transition">
                <div className="w-12 h-12 text-2xl font-bold bg-[#535C91] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold gradient-heading mb-2">{step}</h3>
                <p className="text-muted-foreground ">
                  {
                    ["Create an account to get started.", "Install our browser extension.",
                      "Provide your email for starting.", "Practice mock interviews with ease!"][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Packs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">
              Interview Packs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Master your next technical interview with language-specific question packs.
              Record your answers and compete on the leaderboard!
            </p>
          </div>

          <div className=" items-center justify-center gap-6">
            {interviewPacks.map((pack) => (
              <Card key={pack.id} className="shadow-card mx-auto max-w-xl hover:shadow-card-hover transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <pack.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{pack.price}</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <p className="text-muted-foreground mb-4">{pack.language}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="h-4 w-4 text-primary" />
                      <span>{pack.questions} Questions</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {pack.difficulty}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Purchase Pack
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">Compete on Leaderboards</h3>
                    <p className="text-muted-foreground">See how you rank against other candidates</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each interview pack has its own leaderboard showing top performers based on their scores.
                  Record your best answers and climb to the top!
                </p>
              </CardContent>
            </Card>
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
          <Button size="lg" variant="secondary" onClick={()=>navigate("/sign-in")} className="text-lg">
            Get Started first 3 interviews FREE
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;