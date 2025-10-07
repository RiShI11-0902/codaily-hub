import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";
import { RecordedAnswer } from "@/types/interview";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useInterviewData } from "@/hooks/useInterviewData";
import { submitInterview } from "@/services/api";
import { FeedbackDialog } from "@/components/interview/FeedbackDialog";
import { QuestionCard } from "@/components/interview/QuestionCard";
import { RecordingControls } from "@/components/interview/RecordingControls";
import { AnswerTextarea } from "@/components/interview/AnswerTextarea";

const InterviewInterface = () => {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState<RecordedAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const { questions } = useInterviewData(packId);
  const {
    isRecording,
    recordingType,
    recordedChunks,
    startRecording,
    stopRecording,
    resetRecording,
    cleanup
  } = useMediaRecorder();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;


  const saveAnswer = () => {
    if (recordedChunks.length === 0 && !answerText.trim()) {
      toast({
        title: "No answer provided",
        description: "Please record your answer or write a text response before saving.",
        variant: "destructive",
      });
      return;
    }

    const newAnswer: RecordedAnswer = {
      questionId: currentQuestion._id,
      question: currentQuestion.questionText,
      answerText: answerText.trim(),
    };

    if (recordingType === 'video') {
      newAnswer.videoBlob = recordedChunks[0];
    } else if (recordingType === 'audio') {
      newAnswer.audioBlob = recordedChunks[0];
    }

    setRecordedAnswers([...recordedAnswers, newAnswer]);
    resetRecording();
    setAnswerText("");

    toast({
      title: "Answer saved",
      description: "Your answer has been recorded successfully.",
    });

    // Move to next question or submit
    if (isLastQuestion) {
      submitAllAnswers([...recordedAnswers, newAnswer]);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const submitAllAnswers = async (answers: RecordedAnswer[]) => {
    setIsSubmitting(true);

    try {
      const response = await submitInterview(packId || '', answers);

      const feedbackText = response?.feedback;
      if (feedbackText) {
        setFeedback(feedbackText);
        setTimeout(() => {
          setShowFeedbackDialog(true);
        }, 2000);
      }

      toast({
        title: "Interview completed!",
        description: "Your answers have been submitted successfully. Feedback will be shown shortly.",
      });

      // Navigate to leaderboard after showing feedback
      setTimeout(() => {
        navigate(`/dashboard/leaderboard/${packId}`);
      }, 5000);
    } catch (error) {
      console.error('Error submitting interview:', error);
      toast({
        title: "Submission error",
        description: "There was an error submitting your interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-heading mb-2">Interview in Progress</h1>
          <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        {feedback && (
          <Button 
            onClick={() => setShowFeedbackDialog(true)}
            variant="outline"
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            View Feedback
          </Button>
        )}
      </div>

      <Progress value={progress} className="h-2" />

      <QuestionCard question={currentQuestion} currentIndex={currentQuestionIndex}>
        <AnswerTextarea 
          value={answerText}
          onChange={setAnswerText}
          disabled={isRecording}
        />

        <RecordingControls
          isRecording={isRecording}
          recordingType={recordingType}
          recordedChunks={recordedChunks}
          answerText={answerText}
          isLastQuestion={isLastQuestion}
          isSubmitting={isSubmitting}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onSaveAnswer={saveAnswer}
        />
      </QuestionCard>

      {/* Progress Indicator */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Questions Completed</span>
            <span className="font-semibold">{recordedAnswers.length} / {questions.length}</span>
          </div>
        </CardContent>
      </Card>

      <FeedbackDialog
        open={showFeedbackDialog}
        onOpenChange={setShowFeedbackDialog}
        feedback={feedback}
        packId={packId}
      />
    </div>
  );
};

export default InterviewInterface;
