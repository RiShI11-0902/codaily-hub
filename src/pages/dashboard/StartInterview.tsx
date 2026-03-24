import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, Zap, Video, Award, Code } from "lucide-react";
import axios from "axios";
import { FeedbackDialog } from "@/components/interview/FeedbackDialog";

const StartInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

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
      // await new Promise(resolve => setTimeout(resolve, 1200));


      try {
        // Dummy API call
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/pack/purchased`); // your endpoint to fetch all packs

        setData(data.packs);

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

        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.length === 0 ? (
              <p>No unused packs available</p>
            ) : (
              data.map((pack) => (
                <Card key={pack._id} className="shadow-card hover:shadow-card-hover transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <Badge variant="default">{pack.pack.language}</Badge>
                    </div>
                    <CardTitle className="text-xl">{pack.pack.packName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Video className="h-4 w-4 text-primary" />
                        <span>{pack.pack.questions?.length} Questions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary" />
                        <Badge variant="outline" className="text-xs">{pack.pack.description}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {
                        pack.used ? <Button
                          className="flex-1"
                          size="lg"
                          onClick={() => {
                            setFeedback(pack.attempts[0].feedback)
                            setShowFeedbackDialog(true)
                          }}
                        >
                          <PlayCircle className="mr-2 h-4 w-4" />
                          See Feedback
                        </Button> : <Button
                          className="flex-1"
                          size="lg"
                          onClick={() => navigate(`/dashboard/interview/${pack.pack._id}`)}
                        >
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Start
                        </Button>
                      }
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate(`/dashboard/leaderboard/${pack.pack._id}`)}
                      >
                        Leaderboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

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

      <FeedbackDialog
        open={showFeedbackDialog}
        onOpenChange={setShowFeedbackDialog}
        feedback={feedback}
        packId={""}
      />
    </div>
  );
};

export default StartInterview;
