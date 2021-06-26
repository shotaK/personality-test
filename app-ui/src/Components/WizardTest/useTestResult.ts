import { useAppSelector } from "Domain/hooks";
import {
  questionsSelector,
  scoresSelector,
  selectedAnswersSelector,
} from "Domain/TestWizard/TestWizardSelectors";

const useTestResult = () => {
  const scores = useAppSelector(scoresSelector);
  const questions = useAppSelector(questionsSelector);
  const selectedAnswers = useAppSelector(selectedAnswersSelector);

  const getScoreByAverage = (average: number) => {
    return scores.find((score) => {
      const { minAverageScore, maxAverageScore } = score;
      if (average >= minAverageScore && average <= maxAverageScore) {
        return score;
      }
      return null;
    });
  };

  const getTestResult = () => {
    let answerAmount = 0;
    let totalScore = 0;

    Object.entries(selectedAnswers).forEach(([questionId, answerId]) => {
      questions.forEach(({ _id, answers }) => {
        if (questionId === _id) {
          answers.forEach(({ _id, weight }) => {
            if (_id === answerId) {
              totalScore += weight;
            }
          });
        }
      });
      answerAmount++;
    });

    const averageScore = totalScore / answerAmount;
    return getScoreByAverage(averageScore);
  };

  return { getTestResult };
};

export default useTestResult;
