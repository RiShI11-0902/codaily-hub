import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Video, Mic, Square, Save, ChevronRight, Award } from "lucide-react";
import axios from "axios";

interface Question {
  id: number;
  question: string;
}

interface RecordedAnswer {
  questionId: number;
  question: string;
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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Dummy questions - in production, fetch based on packId
  const questions: Question[] = [
    { id: 1, question: "Explain the concept of Object-Oriented Programming and its key principles." },
    { id: 2, question: "What is the difference between stack and heap memory allocation?" },
    { id: 3, question: "Describe how you would implement a binary search tree." },
    { id: 4, question: "Explain the concept of closures in JavaScript/Python." },
    { id: 5, question: "What are the benefits of using design patterns in software development?" },
  ];

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
    if (recordedChunks.length === 0) {
      toast({
        title: "No recording",
        description: "Please record your answer before saving.",
        variant: "destructive",
      });
      return;
    }

    const newAnswer: RecordedAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
    };

    if (recordingType === 'video') {
      newAnswer.videoBlob = recordedChunks[0];
    } else {
      newAnswer.audioBlob = recordedChunks[0];
    }

    setRecordedAnswers([...recordedAnswers, newAnswer]);
    setRecordedChunks([]);
    setRecordingType(null);

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
        if (answer.videoBlob) {
          formData.append(`videos[${index}]`, answer.videoBlob, `question_${answer.questionId}.webm`);
        }
        if (answer.audioBlob) {
          formData.append(`audios[${index}]`, answer.audioBlob, `question_${answer.questionId}.webm`);
        }
      });

      // Dummy API call - replace with actual endpoint
      await axios.post('/api/submit-interview', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).catch(() => {
        // Simulate successful submission for dummy
        console.log('Interview submitted (dummy):', answers);
      });

      toast({
        title: "Interview completed!",
        description: "Your answers have been submitted successfully.",
      });

      // Navigate to leaderboard
      navigate(`/dashboard/leaderboard/${packId}`);
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
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-heading mb-2">Interview in Progress</h1>
        <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
      </div>

      <Progress value={progress} className="h-2" />

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl">Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-muted/30 rounded-lg">
            <p className="text-lg">{currentQuestion.question}</p>
          </div>

          {/* Video Preview */}
          {recordingType === 'video' && (
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
          )}

          {/* Audio Recording Indicator */}
          {recordingType === 'audio' && isRecording && (
            <div className="p-8 bg-muted/30 rounded-lg flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Mic className="h-8 w-8 text-destructive-foreground" />
              </div>
              <p className="text-lg font-medium">Recording audio...</p>
            </div>
          )}

          {/* Recording Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isRecording ? (
              <>
                <Button
                  onClick={() => startRecording('video')}
                  size="lg"
                  className="flex-1"
                  disabled={recordedChunks.length > 0}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Record Video Answer
                </Button>
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

          {/* Save Button */}
          {recordedChunks.length > 0 && !isRecording && (
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
    </div>
  );
};

export default InterviewInterface;
