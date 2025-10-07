import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useUserStore from "@/store/store";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { Leaderboard } from "@/components/dashboard/Leaderboard";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const { user } = useUserStore();
  const { loading, data, chartData, filterChartByDate, updateChart } = useDashboardData(user._id);

  const formatTime = (averageTime: number) => {
    const avgMinutes = Math.floor(averageTime / 60);
    const avgSeconds = Math.floor(averageTime % 60);
    return `${avgMinutes}m ${avgSeconds}s`;
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    filterChartByDate(date);
  };

  const handleReset = () => {
    setSelectedDate("");
    if (data?.progressData) {
      updateChart(data.progressData);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentActivity = data?.stats?.foundQuestions || [];

  // Dummy leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alice Johnson", avgAccuracy: 94.5 },
    { rank: 2, name: "Bob Smith", avgAccuracy: 91.2 },
    { rank: 3, name: "Carol Williams", avgAccuracy: 88.7 },
    { rank: 4, name: "David Brown", avgAccuracy: 85.3 },
    { rank: 5, name: "Emma Davis", avgAccuracy: 82.9 },
  ];

  // Current user (example - not in top 5)
  const currentUser = {
    rank: 12,
    name: user?.name || "You",
    avgAccuracy: stats.average || 75.5
  };

  const isCurrentUserInTop5 = leaderboardData.some(u => u.name === currentUser.name);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track your coding journey and progress</p>
      </div>

      <StatsCards stats={stats} formatTime={formatTime} />

      {/* Progress Activity Chart & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart
          data={chartData}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onReset={handleReset}
        />

        <Leaderboard
          users={leaderboardData}
          currentUser={currentUser}
          showCurrentUser={!isCurrentUserInTop5}
        />
      </div>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity: any) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full bg-primary`} />
                  <div>
                    <p className="font-medium">{
                    activity?.problem.substring(44, 90) + "..."  
                    }</p>
                  </div>
                </div>
                <span className={`text-sm font-medium text-primary`}>
                  Completed
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
