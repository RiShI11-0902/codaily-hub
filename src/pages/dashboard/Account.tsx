import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Shield } from "lucide-react";
import { toast } from "sonner";

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        // Dummy API call
        const response = await fetch('/api/account').catch(() => ({
          ok: false,
          json: async () => ({ 
            message: "Account data loaded",
            user: {
              name: "Alex Johnson",
              email: "alex.johnson@example.com",
              memberSince: "January 2024",
              plan: "Pro",
              username: "alexj_dev",
              phoneNumber: "+1 (555) 123-4567",
              location: "San Francisco, CA",
              bio: "Full-stack developer passionate about algorithms and data structures",
              linkedAccounts: {
                github: "alexjohnson",
                linkedin: "alex-johnson-dev"
              },
              stats: {
                totalProblems: 247,
                easyProblems: 124,
                mediumProblems: 89,
                hardProblems: 34,
                submissions: 512,
                acceptanceRate: 85
              }
            }
          })
        }));
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = () => {
    toast.success("Settings saved successfully!", {
      description: "Your account information has been updated",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={data?.user?.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue={data?.user?.username} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={data?.user?.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={data?.user?.phoneNumber} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={data?.user?.location} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" defaultValue={data?.user?.bio} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" placeholder="Enter new password" />
            </div>

            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Membership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-lg font-semibold gradient-heading">{data?.user?.plan}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{data?.user?.memberSince}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Enable 2FA
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Problem Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Easy</span>
                <span className="font-semibold text-green-500">{data?.user?.stats?.easyProblems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Medium</span>
                <span className="font-semibold text-yellow-500">{data?.user?.stats?.mediumProblems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Hard</span>
                <span className="font-semibold text-red-500">{data?.user?.stats?.hardProblems}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-sm font-medium">Total</span>
                <span className="font-bold gradient-heading">{data?.user?.stats?.totalProblems}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm text-muted-foreground">Acceptance Rate</span>
                <span className="font-semibold text-primary">{data?.user?.stats?.acceptanceRate}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
