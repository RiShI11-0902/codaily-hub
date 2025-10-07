import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";
import { LeaderboardUser } from "@/types/dashboard";

interface LeaderboardProps {
  users: LeaderboardUser[];
  currentUser: LeaderboardUser;
  showCurrentUser: boolean;
}

export const Leaderboard = ({ users, currentUser, showCurrentUser }: LeaderboardProps) => {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const renderRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-muted-foreground">#{rank}</span>;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.rank}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {renderRankIcon(user.rank)}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getAccuracyColor(user.avgAccuracy)}`}>
                  {user.avgAccuracy.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Avg Accuracy</p>
              </div>
            </div>
          ))}

          {showCurrentUser && (
            <>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Your Rank</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border-2 border-primary">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    <span className="text-sm font-semibold text-primary">
                      #{currentUser.rank}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-primary">{currentUser.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getAccuracyColor(currentUser.avgAccuracy)}`}>
                    {currentUser.avgAccuracy.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Accuracy</p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
