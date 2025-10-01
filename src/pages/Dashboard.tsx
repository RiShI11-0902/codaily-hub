import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Code, Target, Flame, Award } from "lucide-react";

const Dashboard = () => {
  const chartData = [
    { day: "Mon", problems: 3 },
    { day: "Tue", problems: 5 },
    { day: "Wed", problems: 4 },
    { day: "Thu", problems: 7 },
    { day: "Fri", problems: 6 },
    { day: "Sat", problems: 8 },
    { day: "Sun", problems: 5 },
  ];

  const stats = [
    { title: "Problems Solved", value: "142", icon: Code, color: "text-primary" },
    { title: "Current Streak", value: "12 days", icon: Flame, color: "text-accent" },
    { title: "Packs Completed", value: "8", icon: Target, color: "text-secondary" },
    { title: "Achievements", value: "24", icon: Award, color: "text-primary" },
  ];

  const recentActivity = [
    { title: "Completed: Two Sum Problem", time: "2 hours ago", type: "success" },
    { title: "Started: Dynamic Programming Pack", time: "1 day ago", type: "info" },
    { title: "Achievement Unlocked: Week Warrior", time: "3 days ago", type: "achievement" },
    { title: "Completed: Array Mastery Pack", time: "5 days ago", type: "success" },
  ];

  const activePacks = [
    { name: "Dynamic Programming", progress: 65 },
    { name: "Graph Algorithms", progress: 40 },
    { name: "System Design", progress: 20 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold gradient-heading">Dashboard</h1>
          </header>

          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-12 w-12 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts & Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="problems" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Active Packs */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Active Packs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {activePacks.map((pack, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{pack.name}</span>
                        <span className="text-muted-foreground">{pack.progress}%</span>
                      </div>
                      <Progress value={pack.progress} />
                    </div>
                  ))}
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
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-primary' :
                        activity.type === 'achievement' ? 'bg-accent' :
                        'bg-secondary'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
