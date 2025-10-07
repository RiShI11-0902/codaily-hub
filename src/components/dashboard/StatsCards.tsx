import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code2, Flame, Target, Trophy } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
  formatTime: (seconds: number) => string;
}

export const StatsCards = ({ stats, formatTime }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interviews Given</CardTitle>
          <Code2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.foundQuestions?.length}</div>
          <p className="text-xs text-muted-foreground">+12 from last week</p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Accuracy</CardTitle>
          <Flame className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <span className={`text-xl font-bold ${
              (stats.average ?? 0) < 40 ? 'text-red-900' : 
              ((stats.average ?? 0) < 70 ? 'text-yellow-800' : 'text-green-700')
            }`}>
              {Number(stats.average?.toFixed(1) ?? 0)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Keep it going!</p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(stats.avgTime ?? 0)}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Target Progress</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.targetProgress || 25}%</div>
          <Progress value={stats.targetProgress || 25} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};
