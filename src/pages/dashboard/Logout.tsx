import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import useUserStore from '../../store/store';

const Logout = () => {
  const navigate = useNavigate();
  const { user, removeUser } = useUserStore();

  useEffect(() => {
    const performLogout = async () => {
      // Simulate API call
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`, 
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        removeUser();
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
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
