import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Code2, Trophy, Flame, Target, Medal, Crown } from "lucide-react";
import axios from "axios";
import useUserStore from "@/store/store";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const { user } = useUserStore();

  const formatTime = (averageTime: number) => {
    const avgMinutes = Math.floor(averageTime / 60);
    const avgSeconds = Math.floor(averageTime % 60);
    return `${avgMinutes}m ${avgSeconds}s`;
  };

  const updateChart = (dataArray: any[]) => {
    const sortedData = [...dataArray].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const mappedData = sortedData.map(item => ({
      date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      correctness: item.correctness || 0
    }));
    setChartData(mappedData);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setSelectedDate(selected);

    if (!selected) {
      updateChart(data.progressData);
      return;
    }

    const filteredData = data.progressData.filter(
      item => new Date(item.date).toISOString().split("T")[0] === selected
    );

    updateChart(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.post(`http://localhost:5000/user/getProgress`, { id: user._id });
        setData(response.data);
        if (response.data.progressData) updateChart(response.data.progressData);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [user._id]);

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

      {/* Stats Cards */}
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
              <span className={`text-xl font-bold ${stats.average < 40 ? 'text-red-900' : (stats.average < 70 ? 'text-yellow-800' : 'text-green-700')}`}>
                {Number(stats.average?.toFixed(1))}%
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
            <div className="text-2xl font-bold">{formatTime(stats.avgTime)}</div>
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

      {/* Progress Activity Chart & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Progress Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 mb-4">
              <label className="text-sm font-semibold">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border border-border bg-background text-foreground p-2 rounded-md text-sm"
              />
              <button
                className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
                onClick={() => { setSelectedDate(""); updateChart(data.progressData); }}
              >
                Reset
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="correctness" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {user.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                      {user.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
                      {user.rank === 3 && <Medal className="h-5 w-5 text-amber-600" />}
                      {user.rank > 3 && (
                        <span className="text-sm font-semibold text-muted-foreground">
                          #{user.rank}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      user.avgAccuracy >= 90 ? 'text-green-600 dark:text-green-400' : 
                      user.avgAccuracy >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 
                      'text-orange-600 dark:text-orange-400'
                    }`}>
                      {user.avgAccuracy.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Accuracy</p>
                  </div>
                </div>
              ))}

              {!isCurrentUserInTop5 && (
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
                      <p className={`text-lg font-bold ${
                        currentUser.avgAccuracy >= 90 ? 'text-green-600 dark:text-green-400' : 
                        currentUser.avgAccuracy >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 
                        'text-orange-600 dark:text-orange-400'
                      }`}>
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
