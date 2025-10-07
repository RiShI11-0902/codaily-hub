import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Video, Mic, Square, Save, ChevronRight, Award, FileText, MessageSquare } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Question {
  _id: number;
  questionText: string;
}

interface RecordedAnswer {
  questionId: number;
  question: string;
  answerText: string;
  videoBlob?: Blob;
  audioBlob?: Blob;
}

const InterviewInterface = () => {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'video' | 'audio' | null>(null);
  const [recordedAnswers, setRecordedAnswers] = useState<RecordedAnswer[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const startRecording = async (type: 'video' | 'audio') => {
    try {
      const constraints = type === 'video'
        ? { video: true, audio: true }
        : { audio: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (type === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const recorder = new MediaRecorder(stream, {
        mimeType: type === 'video' ? 'video/webm' : 'audio/webm'
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, {
          type: type === 'video' ? 'video/webm' : 'audio/webm'
        });
        setRecordedChunks([blob]);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingType(type);

      toast({
        title: "Recording started",
        description: `${type === 'video' ? 'Video' : 'Audio'} recording is now active`,
      });
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: "Error",
        description: "Could not access camera/microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

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
    setRecordedChunks([]);
    setRecordingType(null);
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
      // Create FormData to send files
      const formData = new FormData();
      formData.append('packId', packId || '');

      answers.forEach((answer, index) => {
        formData.append(`questions[${index}]`, answer.question);
        formData.append(`answers[${index}]`, answer.answerText);
        if (answer.videoBlob) {
          formData.append(`videos[${index}]`, answer.videoBlob, `question_${answer.questionId}.webm`);
        }
        if (answer.audioBlob) {
          formData.append(`audios[${index}]`, answer.audioBlob, `question_${answer.questionId}.webm`);
        }
      });

      // Dummy API call - replace with actual endpoint
      const response = await axios.post('/api/submit-interview', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).catch(() => {
        // Simulate successful submission with dummy feedback
        console.log('Interview submitted (dummy):', answers);
        return {
          data: {
            feedback: `Great job completing the interview! Here's your personalized feedback:\n\n✅ Strengths:\n• Clear and concise communication\n• Good technical knowledge demonstrated in ${answers.length} questions\n• Well-structured answers with relevant examples\n\n🎯 Areas for Improvement:\n• Could provide more specific examples in some answers\n• Consider elaborating on edge cases\n• Practice time management for longer responses\n\n📊 Overall Score: ${Math.floor(Math.random() * 20) + 75}%\n\nKeep practicing and you'll excel in your next interview!`
          }
        };
      });

      const feedbackText = response?.data?.feedback;
      if (feedbackText) {
        setFeedback(feedbackText);
        // Show feedback dialog after 2 seconds
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
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/pack/${packId}/questions`);
        setQuestions(res.data.pack.questions || []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuestion()
  }, [])


  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
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

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-muted/30 rounded-lg">
            <p className="text-lg">{currentQuestion?.questionText}</p>
          </div>

          {/* Video Preview */}
          {/* {recordingType === 'video' && (
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full max-h-96 object-cover"
              />
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Recording</span>
                </div>
              )}
            </div>
          )} */}

          {/* Audio Recording Indicator */}
          {recordingType === 'audio' && isRecording && (
            <div className="p-8 bg-muted/30 rounded-lg flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Mic className="h-8 w-8 text-destructive-foreground" />
              </div>
              <p className="text-lg font-medium">Recording audio...</p>
            </div>
          )}

          {/* Answer Text Box */}
          <div className="space-y-2">
            <Label htmlFor="answer-text" className="flex items-center gap-2 text-base font-semibold">
              <FileText className="h-4 w-4" />
              Your Answer (Text)
            </Label>
            <Textarea
              id="answer-text"
              placeholder="Type or edit your answer here. You can write your response directly or edit the transcript after recording..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="min-h-[150px] resize-y"
              disabled={isRecording}
            />
            <p className="text-xs text-muted-foreground">
              {answerText.length > 0
                ? `${answerText.length} characters`
                : "You can type your answer or record audio/video"}
            </p>
          </div>

          {/* Recording Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isRecording ? (
              <>
                {/* <Button
                  onClick={() => startRecording('video')}
                  size="lg"
                  className="flex-1"
                  disabled={recordedChunks.length > 0}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Record Video Answer
                </Button> */}
                <Button
                  onClick={() => startRecording('audio')}
                  size="lg"
                  variant="secondary"
                  className="flex-1"
                  disabled={recordedChunks.length > 0}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Record Audio Answer
                </Button>
              </>
            ) : (
              <Button
                onClick={stopRecording}
                size="lg"
                variant="destructive"
                className="flex-1"
              >
                <Square className="mr-2 h-5 w-5" />
                Stop Recording
              </Button>
            )}
          </div>

          {/* Recording Status */}
          {recordedChunks.length > 0 && !isRecording && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-primary flex items-center gap-2">
                <Award className="h-4 w-4" />
                {recordingType === 'video' ? 'Video' : 'Audio'} recording completed!
                {answerText.trim() ? " You can now edit your text answer or save to continue." : " Add a text summary above or save to continue."}
              </p>
            </div>
          )}

          {/* Save Button */}
          {(recordedChunks.length > 0 || answerText.trim()) && !isRecording && (
            <Button
              onClick={saveAnswer}
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isLastQuestion ? (
                <>
                  <Award className="mr-2 h-5 w-5" />
                  Submit Interview
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save & Next Question
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Questions Completed</span>
            <span className="font-semibold">{recordedAnswers.length} / {questions.length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
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
            <Button onClick={() => setShowFeedbackDialog(false)}>
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
    </div>
  );
};

export default InterviewInterface;
