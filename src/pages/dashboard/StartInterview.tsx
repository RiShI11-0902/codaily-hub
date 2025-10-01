import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, Clock, Zap } from "lucide-react";

const StartInterview = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      try {
        // Dummy API call
        const response = await fetch('/api/start-interview').catch(() => ({
          ok: false,
          json: async () => ({ 
            message: "Interview data loaded",
            interviews: [
              { id: 1, type: "Easy", duration: "30 min", questions: 2 },
              { id: 2, type: "Medium", duration: "45 min", questions: 3 },
              { id: 3, type: "Hard", duration: "60 min", questions: 4 },
            ]
          })
        }));
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-56" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">Start Interview</h1>
        <p className="text-muted-foreground">Practice mock interviews to ace your next technical round</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.interviews?.map((interview: any) => (
          <Card key={interview.id} className="shadow-card hover:shadow-card-hover transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                {interview.type} Level
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{interview.duration}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {interview.questions} Questions
                </div>
              </div>
              <Button className="w-full" size="lg">
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card mt-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">Interview Tips</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Ensure you're in a quiet environment with stable internet</li>
            <li>• Think out loud to demonstrate your problem-solving approach</li>
            <li>• Test your code with edge cases before submitting</li>
            <li>• Ask clarifying questions when needed</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartInterview;
