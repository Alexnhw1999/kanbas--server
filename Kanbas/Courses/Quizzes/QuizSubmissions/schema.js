import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema({
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
  studentId: {
    type: String,
    required: true
  },
  attemptNumber: {
    type: Number,
    required: true
  },
  answers: [{
    questionId: String,
    questionType: {
      type: String,
      enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_BLANK']
    },
    userAnswer: mongoose.Schema.Types.Mixed,  // Can be string or boolean
    correctAnswer: mongoose.Schema.Types.Mixed,
    points: Number,
    maxPoints: Number,
    isCorrect: Boolean,
    question: String,
    explanation: String,
    choices: [{
      text: String,
      isCorrect: Boolean
    }]
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress'],
    default: 'completed'
  }
}, {
  collection: "quizSubmissions",
  timestamps: true
});

export default quizSubmissionSchema;