import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  quizId: {
    type: String,
    required: true,
    ref: 'QuizModel'
  },
  courseId: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  points: {
    type: Number,
    required: true,
    default: 10
  },
  questionType: {
    type: String,
    enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_BLANK'],
    default: 'MULTIPLE_CHOICE'
  },
  question: {
    type: String,
    required: true
  },
  // For multiple choice questions
  choices: [{
    text: String,
    isCorrect: Boolean
  }],
  // For true/false questions
  correctAnswer: {
    type: Boolean,
    // Only required if questionType is TRUE_FALSE
    required: function() {
      return this.questionType === 'TRUE_FALSE';
    }
  },
  // For fill in the blank questions
  correctAnswers: [{
    text: String,
    caseSensitive: {
      type: Boolean,
      default: false
    }
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  collection: "quizQuestions",
  timestamps: true
});

export default questionSchema;