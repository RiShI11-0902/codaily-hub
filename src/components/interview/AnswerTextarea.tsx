import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface AnswerTextareaProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const AnswerTextarea = ({ value, onChange, disabled }: AnswerTextareaProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="answer-text" className="flex items-center gap-2 text-base font-semibold">
        <FileText className="h-4 w-4" />
        Your Answer (Text)
      </Label>
      <Textarea
        id="answer-text"
        placeholder="Type or edit your answer here. You can write your response directly or edit the transcript after recording..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[150px] resize-y"
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground">
        {value.length > 0
          ? `${value.length} characters`
          : "You can type your answer or record audio/video"}
      </p>
    </div>
  );
};
