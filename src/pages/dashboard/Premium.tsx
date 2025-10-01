import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Premium = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        // Dummy API call
        const response = await fetch('/api/premium').catch(() => ({
          ok: false,
          json: async () => ({ 
            message: "Premium data loaded",
            isSubscribed: false,
            features: [
              "Unlimited coding challenges",
              "Advanced analytics dashboard",
              "Priority support",
              "Exclusive interview prep content",
              "Custom learning paths",
              "Ad-free experience",
            ]
          })
        }));
        
        const result = await response.json();
        setData(result);
        setIsSubscribed(result.isSubscribed);
      } catch (error) {
        console.error("Error fetching premium data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpgrade = () => {
    if (isSubscribed) {
      toast.success("You're already subscribed to Premium!", {
        description: "Enjoy all premium features",
        icon: <Crown className="h-4 w-4" />,
      });
    } else {
      toast.info("Redirecting to checkout...", {
        description: "Complete your purchase to unlock premium features",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">Go Premium</h1>
        <p className="text-muted-foreground">Unlock the full potential of 2CodeDaily</p>
      </div>

      <Card className="shadow-card max-w-2xl">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary via-primary to-accent flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl mb-2">Premium Membership</CardTitle>
          <div className="text-4xl font-bold gradient-heading">
            $19<span className="text-xl text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {data?.features?.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <Button 
            size="lg" 
            className="w-full" 
            onClick={handleUpgrade}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isSubscribed ? "Already Subscribed" : "Upgrade to Premium"}
          </Button>

          {isSubscribed && (
            <div className="text-center text-sm text-muted-foreground">
              You're enjoying all premium benefits
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Premium;
