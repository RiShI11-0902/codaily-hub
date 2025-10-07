export interface Question {
  _id: number;
  questionText: string;
}

export interface RecordedAnswer {
  questionId: number;
  question: string;
  answerText: string;
  videoBlob?: Blob;
  audioBlob?: Blob;
}

export type RecordingType = 'video' | 'audio' | null;
