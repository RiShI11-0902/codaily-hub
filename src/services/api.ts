import axios from "axios";
import { RecordedAnswer } from "@/types/interview";
import { generateDummyFeedback } from "@/constants/feedback";

export const submitInterview = async (packId: string, answers: RecordedAnswer[]) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/pack/${packId}/submit`, {answers});
    return response.data;
  } catch {
    return {
      feedback: generateDummyFeedback(answers.length)
    };
  }
};
