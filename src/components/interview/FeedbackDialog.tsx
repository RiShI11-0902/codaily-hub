import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Award } from "lucide-react";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedback: string | null;
  packId: string | undefined;
}

export const FeedbackDialog = ({ open, onOpenChange, feedback, packId }: FeedbackDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Award className="h-6 w-6 text-primary" />
            Interview Feedback
          </DialogTitle>
          <DialogDescription>
            Here's your personalized feedback based on your interview performance
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {feedback}
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/dashboard/leaderboard/${packId}`)}
          >
            View Leaderboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
