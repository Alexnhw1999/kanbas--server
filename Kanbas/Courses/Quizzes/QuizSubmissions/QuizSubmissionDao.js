import QuizSubmissionModel from "./model.js";

export const createSubmission = (submission) => {
  return QuizSubmissionModel.create(submission);
};

export const findSubmissionById = (submissionId) => {
  return QuizSubmissionModel.findById(submissionId);
};

export const findSubmissionsForQuiz = (quizId, studentId) => {
  return QuizSubmissionModel.find({ 
    quizId,
    studentId 
  }).sort({ attemptNumber: -1 });
};

export const findLatestAttemptNumber = async (quizId, studentId) => {
  const latest = await QuizSubmissionModel.findOne({ 
    quizId, 
    studentId 
  }).sort({ attemptNumber: -1 });
  return latest ? latest.attemptNumber : 0;
};

export const updateSubmissionScores = async (submissionId, updates) => {
  const submission = await QuizSubmissionModel.findById(submissionId);
  if (!submission) return null;

  // Update individual answer scores
  submission.answers = submission.answers.map(answer => {
    const update = updates.answers.find(u => u.questionId === answer.questionId);
    if (update) {
      return {
        ...answer,
        points: update.points
      };
    }
    return answer;
  });

  // Recalculate total score and percentage
  const totalScore = submission.answers.reduce((sum, ans) => sum + ans.points, 0);
  const percentage = Math.round((totalScore / submission.maxScore) * 100);

  submission.score = totalScore;
  submission.percentage = percentage;

  return QuizSubmissionModel.findByIdAndUpdate(
    submissionId, 
    { 
      answers: submission.answers,
      score: totalScore,
      percentage: percentage
    },
    { new: true }
  );
};
