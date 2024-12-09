import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    default: () => new mongoose.Types.ObjectId().toString() 
  },
  title: { 
    type: String, 
    required: true 
  },
  course: { 
    type: String, 
    required: true 
  },
  description: String,
  points: { 
    type: Number, 
    default: 100 
  },
dueDate: { 
    type: Date
  },
  availableFromDate: { 
    type: Date
  },
  availableUntilDate: { 
    type: Date
  },
  published: { 
    type: Boolean, 
    default: false 
  },
  numberOfQuestions: { 
    type: Number, 
    default: 0 
  },
  quizType: { 
    type: String, 
    enum: ['GRADED_QUIZ', 'PRACTICE_QUIZ', 'GRADED_SURVEY', 'UNGRADED_SURVEY'],
    default: 'GRADED_QUIZ'
  },
  assignmentGroup: { 
    type: String, 
    enum: ['QUIZZES', 'EXAMS', 'ASSIGNMENTS', 'PROJECT'],
    default: 'QUIZZES'
  },
  shuffleAnswers: { 
    type: Boolean, 
    default: true 
  },
  timeLimit: { 
    type: Number, 
    default: 0 
  },
  multipleAttempts: { 
    type: Boolean, 
    default: false 
  },
  numberOfAttempts: { 
    type: Number, 
    default: 1 
  },
  showCorrectAnswers: { 
    type: Boolean, 
    default: true 
  },
  accessCode: { 
    type: String, 
    default: '' 
  },
  oneQuestionAtTime: { 
    type: Boolean, 
    default: true 
  },
  webcamRequired: { 
    type: Boolean, 
    default: false 
  },
  lockQuestionsAfterAnswering: { 
    type: Boolean, 
    default: false 
  }
}, { 
  collection: "quizzes" 
});

export default quizSchema;