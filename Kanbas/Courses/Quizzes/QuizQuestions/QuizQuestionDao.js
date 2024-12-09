import QuestionModel from "./model.js";
import model from "../model.js";

export const createQuestion = async (question) => {
  const newQuestion = await QuestionModel.create(question);

  await model.updateOne(
    { _id: question.quizId },
    { $inc: { numberOfQuestions: 1 } }
  );

  return newQuestion;
};



export const findQuestionsForQuiz = async (quizId) => {
  try {
    const questions = await QuestionModel.find({ quizId }).sort({ order: 1 });
    
    await model.updateOne(
      { _id: quizId },
      { $set: { numberOfQuestions: questions.length } }
    );

    return questions;
  } catch (error) {
    console.error("DAO: Error finding questions:", error);
    throw error;
  }
};


export const findQuestionById = (questionId) => {
  return QuestionModel.findById(questionId);
};

export const updateQuestion = (questionId, question) => {
  return QuestionModel.updateOne({ _id: questionId }, { $set: question });
};

export const deleteQuestion = (questionId) => {
  return QuestionModel.deleteOne({ _id: questionId });
};

export const reorderQuestions = async (quizId, questionOrders) => {
  const bulkOps = questionOrders.map(({ questionId, order }) => ({
    updateOne: {
      filter: { _id: questionId, quizId },
      update: { $set: { order } }
    }
  }));
  return QuestionModel.bulkWrite(bulkOps);
};

export const calculateQuizPoints = async (quizId) => {
  const result = await QuestionModel.aggregate([
    { $match: { quizId } },
    { $group: { _id: null, totalPoints: { $sum: "$points" } } }
  ]);
  return result[0]?.totalPoints || 0;
};