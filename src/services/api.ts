import axios from "axios";
import { RecordedAnswer } from "@/types/interview";
import { generateDummyFeedback } from "@/constants/feedback";

export const submitInterview = async (packId: string, answers: RecordedAnswer[]) => {
  const formData = new FormData();
  formData.append('packId', packId);

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

  try {
    const response = await axios.post('/api/submit-interview', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch {
    // Simulate successful submission with dummy feedback
    console.log('Interview submitted (dummy):', answers);
    return {
      feedback: generateDummyFeedback(answers.length)
    };
  }
};
