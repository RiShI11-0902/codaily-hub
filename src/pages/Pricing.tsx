import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      features: [
        "5 challenges per week",
        "Basic progress tracking",
        "Community access",
        "Limited problem packs",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 19, yearly: 190 },
      features: [
        "Unlimited daily challenges",
        "Advanced analytics",
        "All problem packs",
        "Priority support",
        "Solution explanations",
        "Custom learning paths",
      ],
      cta: "Start Pro",
      popular: true,
    },
    {
      name: "Team",
      price: { monthly: 49, yearly: 490 },
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Team analytics dashboard",
        "Collaborative features",
        "Admin controls",
        "Dedicated support",
      ],
      cta: "Start Team",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-heading">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include a 7-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`shadow-card hover:shadow-card-hover transition-all relative ${
                plan.popular ? 'border-primary border-2' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary via-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-4">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-5xl font-bold gradient-heading">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
                {isYearly && plan.price.yearly > 0 && (
                  <p className="text-sm text-muted-foreground">
                    ${(plan.price.yearly / 12).toFixed(2)}/month billed annually
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-heading">
            Feature Comparison
          </h2>
          <Card className="shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Free</th>
                    <th className="text-center p-4 font-semibold">Pro</th>
                    <th className="text-center p-4 font-semibold">Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4 text-muted-foreground">Daily Challenges</td>
                    <td className="text-center p-4">5/week</td>
                    <td className="text-center p-4">Unlimited</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">Problem Packs</td>
                    <td className="text-center p-4">Limited</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">Advanced Analytics</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">Team Features</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">Priority Support</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
