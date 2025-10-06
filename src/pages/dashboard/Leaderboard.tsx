import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, ArrowLeft } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  userName: string;
  score: number;
  completedAt: string;
}

const Leaderboard = () => {
  const { packId } = useParams();
  const navigate = useNavigate();

  // Dummy leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, userName: "Sarah Chen", score: 98.5, completedAt: "2024-01-15" },
    { rank: 2, userName: "Michael Rodriguez", score: 96.2, completedAt: "2024-01-14" },
    { rank: 3, userName: "Emily Thompson", score: 94.8, completedAt: "2024-01-16" },
    { rank: 4, userName: "David Kim", score: 92.3, completedAt: "2024-01-13" },
    { rank: 5, userName: "Jessica Martinez", score: 91.7, completedAt: "2024-01-15" },
    { rank: 6, userName: "James Wilson", score: 89.4, completedAt: "2024-01-12" },
    { rank: 7, userName: "Lisa Anderson", score: 87.9, completedAt: "2024-01-16" },
    { rank: 8, userName: "Robert Taylor", score: 86.5, completedAt: "2024-01-14" },
    { rank: 9, userName: "Jennifer Lee", score: 84.2, completedAt: "2024-01-13" },
    { rank: 10, userName: "Christopher Brown", score: 82.8, completedAt: "2024-01-15" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-accent" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (rank: number): "default" | "secondary" | "outline" => {
    if (rank === 1) return "default";
    if (rank <= 3) return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard/start-interview')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold gradient-heading mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top performers for this interview pack</p>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Interview Pack #{packId} Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((entry) => (
              <Card
                key={entry.rank}
                className={`transition-all ${
                  entry.rank <= 3 
                    ? 'shadow-card-hover border-primary/20' 
                    : 'hover:shadow-card'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-lg">{entry.userName}</p>
                        {entry.rank <= 3 && (
                          <Badge variant={getRankBadgeVariant(entry.rank)}>
                            #{entry.rank}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Completed: {new Date(entry.completedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {entry.score}%
                      </div>
                      {entry.rank > 3 && (
                        <p className="text-xs text-muted-foreground">Rank #{entry.rank}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold">{leaderboardData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">
                  {(leaderboardData.reduce((sum, e) => sum + e.score, 0) / leaderboardData.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Medal className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Score</p>
                <p className="text-2xl font-bold">{leaderboardData[0]?.score}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
