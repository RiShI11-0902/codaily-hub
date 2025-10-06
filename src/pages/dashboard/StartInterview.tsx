import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, Zap, Video, Award, Code } from "lucide-react";

const StartInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  
  // Simulate purchased packs (in production, fetch from backend)
  const purchasedPacks = [
    { 
      id: 1,
      name: "Java Interview Pack", 
      language: "Java",
      questions: 25, 
      duration: "60 min",
      difficulty: "Medium",
      purchased: true
    },
    { 
      id: 2,
      name: "Python Mastery", 
      language: "Python",
      questions: 30, 
      duration: "75 min",
      difficulty: "Medium",
      purchased: true
    },
    { 
      id: 3,
      name: "JavaScript Expert", 
      language: "JavaScript",
      questions: 28, 
      duration: "70 min",
      difficulty: "Advanced",
      purchased: true
    },
  ];

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

      {/* Purchased Interview Packs */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-6 w-6 text-primary" />
          Your Interview Packs
        </h2>
        
        {purchasedPacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {purchasedPacks.map((pack) => (
              <Card key={pack.id} className="shadow-card hover:shadow-card-hover transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Code className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <Badge variant="default">{pack.language}</Badge>
                  </div>
                  <CardTitle className="text-xl">{pack.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="h-4 w-4 text-primary" />
                      <span>{pack.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{pack.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-primary" />
                      <Badge variant="outline" className="text-xs">{pack.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      size="lg"
                      onClick={() => navigate(`/dashboard/interview/${pack.id}`)}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => navigate(`/dashboard/leaderboard/${pack.id}`)}
                    >
                      Leaderboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">You haven't purchased any interview packs yet.</p>
              <Button size="lg">Browse Interview Packs</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Practice Levels */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          Quick Practice
        </h2>
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
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">Interview Tips</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Ensure you're in a quiet environment with stable internet</li>
            <li>• Think out loud to demonstrate your problem-solving approach</li>
            <li>• Test your code with edge cases before submitting</li>
            <li>• Ask clarifying questions when needed</li>
            <li>• For video interviews, check your camera and lighting beforehand</li>
            <li>• Review the leaderboard to see how others performed</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartInterview;
