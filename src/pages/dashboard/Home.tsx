import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useUserStore from "@/store/store";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [activityPage, setActivityPage] = useState(1);
  const activityPerPage = 5;
  const { user } = useUserStore();
  const { loading, data, chartData, filterChartByDate, updateChart,  totalPages, topFive, currentuserRank, totalUsers } = useDashboardData(user._id);

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
  
  const activityTotalPages = Math.ceil(recentActivity.length / activityPerPage);
  const activityStartIndex = (activityPage - 1) * activityPerPage;
  const activityEndIndex = activityStartIndex + activityPerPage;
  const paginatedActivity = recentActivity.slice(activityStartIndex, activityEndIndex);

  const isCurrentUserInTop5 = currentuserRank.rank > 5

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
          users={topFive}
          currentUser={currentuserRank}
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
            {paginatedActivity.map((activity: any) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
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

          {activityTotalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setActivityPage(p => Math.max(1, p - 1))}
                      className={activityPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: activityTotalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setActivityPage(page)}
                        isActive={activityPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setActivityPage(p => Math.min(activityTotalPages, p + 1))}
                      className={activityPage === activityTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
