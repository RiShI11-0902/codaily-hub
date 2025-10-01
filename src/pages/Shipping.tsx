import { Card, CardContent } from "@/components/ui/card";
import { Package, Rocket, CheckCircle, Clock } from "lucide-react";

const Shipping = () => {
  const steps = [
    {
      icon: Package,
      title: "Choose Your Pack",
      description: "Browse our curated collection of problem packs and select the ones that align with your learning goals.",
    },
    {
      icon: Rocket,
      title: "Start Immediately",
      description: "Access is instant! Begin solving problems right after sign-up with no waiting period.",
    },
    {
      icon: CheckCircle,
      title: "Track Progress",
      description: "Monitor your completion rate and view detailed analytics on your dashboard.",
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "No deadlines, no pressure. Work through challenges whenever it suits you best.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-heading">
            Getting Started Guide
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about accessing and using 2CodeDaily
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="shadow-card hover:shadow-card-hover transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary via-primary to-accent flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Policies */}
        <section>
          <h2 className="text-3xl font-bold mb-8 gradient-heading">
            Policies & Information
          </h2>
          
          <Card className="shadow-card mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Access & Delivery</h3>
              <p className="text-muted-foreground">
                All content is delivered digitally with immediate access upon subscription. Your account remains active for the duration of your subscription period, with automatic renewal unless cancelled.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Cancellation Policy</h3>
              <p className="text-muted-foreground">
                You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. No partial refunds are provided for unused time.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Content Updates</h3>
              <p className="text-muted-foreground">
                We regularly add new problem packs and challenges. All active subscribers automatically get access to new content at no additional cost. Updates are announced via email and in-app notifications.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Support</h3>
              <p className="text-muted-foreground">
                Need help? Our support team is available via email at support@2codedaily.com. Pro and Team subscribers receive priority support with faster response times.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
