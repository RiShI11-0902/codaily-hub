import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      try {
        // Dummy API call
        await fetch('/api/logout').catch(() => ({}));
        
        toast.success("Logged out successfully", {
          description: "See you next time!",
        });
        
        // Redirect to home page
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Logout failed", {
          description: "Please try again",
        });
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center animate-fade-in">
      <Card className="shadow-card">
        <CardContent className="p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold gradient-heading mb-2">Logging Out...</h2>
          <p className="text-muted-foreground">Please wait while we sign you out</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logout;
