import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Code2, Trophy, Flame, Target } from "lucide-react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const response = await fetch('/api/dashboard').catch(() => ({
          ok: false,
          json: async () => ({ 
            stats: {
              problemsSolved: 247,
              currentStreak: 23,
              studyTime: 87,
              targetProgress: 78
            },
            weeklyActivity: [
              { day: 'Mon', problems: 8 },
              { day: 'Tue', problems: 12 },
              { day: 'Wed', problems: 6 },
              { day: 'Thu', problems: 15 },
              { day: 'Fri', problems: 10 },
              { day: 'Sat', problems: 18 },
              { day: 'Sun', problems: 14 }
            ],
            recentActivity: [
              { id: 1, title: "Two Sum", difficulty: "Easy", completed: true },
              { id: 2, title: "Valid Parentheses", difficulty: "Easy", completed: true },
              { id: 3, title: "Binary Tree Traversal", difficulty: "Medium", completed: true },
              { id: 4, title: "Longest Substring Without Repeating", difficulty: "Medium", completed: true },
              { id: 5, title: "Median of Two Sorted Arrays", difficulty: "Hard", completed: true },
              { id: 6, title: "Maximum Subarray", difficulty: "Medium", completed: true },
              { id: 7, title: "Climbing Stairs", difficulty: "Easy", completed: true },
              { id: 8, title: "Merge K Sorted Lists", difficulty: "Hard", completed: false },
              { id: 9, title: "Reverse Linked List", difficulty: "Easy", completed: true },
              { id: 10, title: "Design Twitter", difficulty: "Hard", completed: false }
            ]
          })
        }));
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  const stats = data?.stats || {};
  const weeklyActivity = data?.weeklyActivity || [];
  const recentActivity = data?.recentActivity || [];

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
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.problemsSolved}</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak} days</div>
            <p className="text-xs text-muted-foreground">Keep it going!</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.studyTime}h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Progress</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.targetProgress}%</div>
            <Progress value={stats.targetProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
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
              <Bar dataKey="problems" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
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
                  <div className={`w-2 h-2 rounded-full ${activity.completed ? 'bg-primary' : 'bg-muted'}`} />
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.difficulty}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${activity.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                  {activity.completed ? 'Completed' : 'In Progress'}
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
