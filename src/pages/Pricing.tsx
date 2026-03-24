import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CheckoutDialog } from "@/components/checkout/CheckoutDialog";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number, productId: string, isSubscription: boolean } | null>(null);

  const handleCheckout = (planName: string, price: number, productId: string, isSubscription: boolean) => {
    setSelectedPlan({ name: planName, price, productId, isSubscription });
    setCheckoutOpen(true);
  };

  const singlePacks = [
    { name: "JS Pack", features: ["15–20 JS questions", "AI feedback for the pack"], productId: 'pdt_LRMJGZzWskjKJXVXAxvVm' },
  ];

  const plans = [
    {
      name: "LeetCode Pack",
      price: { monthly: 10 },
      features: [
        "Up to 30 LeetCode AI mock interviews/month",
        "Max 5 interviews per day",
        "Real-time AI dynamic questions",
        "Feedback after 10 questions per interview",
      ],
      cta: "Subscribe",
      popular: true,
      productId: "pdt_YdMeXPg11MAZGS5LAe8vl"
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
            Start free and upgrade as you grow. All plans include AI-powered feedback.
            ( Subscriptions are temporarily paused as we migrate our payment gateway. For early access or queries, reach us at contact2codedaily@gmail.com )
          </p>
        </div>
        <div className="grid grid-cols-1  gap-8 max-w-2xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`shadow-card hover:shadow-card-hover transition-all relative ${plan.popular ? 'border-primary border-2' : ''
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
                    ${plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.name === "Single Pack" ? "" : `/${isYearly ? 'year' : 'month'}`}
                  </span>
                </div>
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
                  onClick={() => handleCheckout(plan.name, plan.price.monthly, plan.productId, true)}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {singlePacks.map((pack, idx) => (
            <Card key={idx} className="shadow-card hover:shadow-card-hover transition-all relative">
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-4">{pack.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-5xl font-bold gradient-heading">$5</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant="outline"
                  size="lg"
                  disabled
                  onClick={() => handleCheckout(pack.name, 5, pack.productId, false)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <CheckoutDialog
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          productId={selectedPlan.productId}
          isSubscription={selectedPlan.isSubscription}
        />
      )}
    </div>
  );
};

export default Pricing;
