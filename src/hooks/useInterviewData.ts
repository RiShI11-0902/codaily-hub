import { useState, useEffect } from "react";
import axios from "axios";
import { Question } from "@/types/interview";

export const useInterviewData = (packId: string | undefined) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/pack/${packId}/questions`);
        setQuestions(res.data.pack.questions || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    if (packId) {
      fetchQuestions();
    }
  }, [packId]);

  return { questions, loading, error };
};
