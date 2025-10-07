export const generateDummyFeedback = (questionsCount: number): string => {
  const score = Math.floor(Math.random() * 20) + 75;
  
  return `Great job completing the interview! Here's your personalized feedback:

✅ Strengths:
• Clear and concise communication
• Good technical knowledge demonstrated in ${questionsCount} questions
• Well-structured answers with relevant examples

🎯 Areas for Improvement:
• Could provide more specific examples in some answers
• Consider elaborating on edge cases
• Practice time management for longer responses

📊 Overall Score: ${score}%

Keep practicing and you'll excel in your next interview!`;
};
