// import { useState, useRef } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { RecordingType } from "@/types/interview";

// export const useMediaRecorder = () => {
//   const { toast } = useToast();
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingType, setRecordingType] = useState<RecordingType>(null);
//   const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const startRecording = async (type: 'video' | 'audio') => {
//     try {
//       const constraints = type === 'video'
//         ? { video: true, audio: true }
//         : { audio: true };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       streamRef.current = stream;

//       if (type === 'video' && videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       const recorder = new MediaRecorder(stream, {
//         mimeType: type === 'video' ? 'video/webm' : 'audio/webm'
//       });

//       const chunks: Blob[] = [];
//       recorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunks.push(e.data);
//         }
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunks, {
//           type: type === 'video' ? 'video/webm' : 'audio/webm'
//         });
//         setRecordedChunks([blob]);
//       };

//       recorder.start();
//       setMediaRecorder(recorder);
//       setIsRecording(true);
//       setRecordingType(type);

//       toast({
//         title: "Recording started",
//         description: `${type === 'video' ? 'Video' : 'Audio'} recording is now active`,
//       });
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//       toast({
//         title: "Error",
//         description: "Could not access camera/microphone. Please check permissions.",
//         variant: "destructive",
//       });
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state !== 'inactive') {
//       mediaRecorder.stop();
//       setIsRecording(false);

//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//         streamRef.current = null;
//       }

//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//     }
//   };

//   const resetRecording = () => {
//     setRecordedChunks([]);
//     setRecordingType(null);
//   };

//   const cleanup = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }
//   };

//   return {
//     isRecording,
//     recordingType,
//     recordedChunks,
//     videoRef,
//     startRecording,
//     stopRecording,
//     resetRecording,
//     cleanup
//   };
// };

import { useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useToast } from "@/hooks/use-toast";
import { RecordingType } from "@/types/interview";

export const useMediaRecorder = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<RecordingType>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Live transcript
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

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

      setIsRecording(true);
      setRecordingType(type);

      // Start live transcript
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });

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
    setIsRecording(false);
    setRecordingType(null);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    // Stop transcript
    SpeechRecognition.stopListening();
  };

  const resetRecording = () => {
    resetTranscript();
  };

  return {
    isRecording,
    recordingType,
    transcript,        // ✅ your live speech-to-text
    listening,         // ✅ true if transcription is active
    videoRef,
    startRecording,
    stopRecording,
    resetRecording,
  };
};

