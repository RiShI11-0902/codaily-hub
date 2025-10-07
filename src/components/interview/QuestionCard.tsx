import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/types/interview";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  children?: React.ReactNode;
}

export const QuestionCard = ({ question, currentIndex, children }: QuestionCardProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-2xl">Question {currentIndex + 1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-muted/30 rounded-lg">
          <p className="text-lg">{question?.questionText}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
