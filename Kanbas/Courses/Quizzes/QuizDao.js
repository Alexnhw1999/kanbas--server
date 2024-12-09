import model from "./model.js";

export const createQuiz = (quiz) => {
    return model.create(quiz);
};

export const findQuizzesForCourse = (courseId) => {
    return model.find({ course: courseId });
};

export const findQuizById = (quizId) => {
    return model.findById(quizId);
};

export const updateQuiz = (quizId, quiz) => {
    return model.updateOne({ _id: quizId }, { $set: quiz });
};

export const deleteQuiz = (quizId) => {
    return model.deleteOne({ _id: quizId });
};

export const publishQuiz = async (quizId) => {
    const quiz = await model.findById(quizId);
    const updatedPublishStatus = !quiz.published;
    return model.updateOne(
        { _id: quizId },
        { $set: { published: updatedPublishStatus } }
    );
};