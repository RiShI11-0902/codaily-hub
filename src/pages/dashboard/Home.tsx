import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Code2, Trophy, Flame, Target } from "lucide-react";
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

      {/* Progress Activity Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Progress Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <label className="text-lg text-white font-semibold">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border p-2 rounded-md"
            />
            <button
              className="bg-primary text-white px-3 py-1 rounded-md"
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
