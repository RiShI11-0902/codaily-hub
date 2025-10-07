import { Button } from "@/components/ui/button";
import { Video, Mic, Square, Save, ChevronRight, Award } from "lucide-react";
import { RecordingType } from "@/types/interview";

interface RecordingControlsProps {
  isRecording: boolean;
  recordingType: RecordingType;
  recordedChunks: Blob[];
  answerText: string;
  isLastQuestion: boolean;
  isSubmitting: boolean;
  onStartRecording: (type: 'video' | 'audio') => void;
  onStopRecording: () => void;
  onSaveAnswer: () => void;
}

export const RecordingControls = ({
  isRecording,
  recordingType,
  recordedChunks,
  answerText,
  isLastQuestion,
  isSubmitting,
  onStartRecording,
  onStopRecording,
  onSaveAnswer
}: RecordingControlsProps) => {
  const hasContent = recordedChunks.length > 0 || answerText.trim();

  return (
    <>
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
              onClick={() => onStartRecording('audio')}
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
            onClick={onStopRecording}
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
      {hasContent && !isRecording && (
        <Button
          onClick={onSaveAnswer}
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
    </>
  );
};
