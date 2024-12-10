import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from './Kanbas/Courses/routes.js';
import "dotenv/config";
import session from "express-session";
import ModuleRoutes from './Kanbas/Modules/routes.js';
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from './Kanbas/Courses/Assignments/routes.js';
import QuizRoutes from './Kanbas/Courses/Quizzes/routes.js'; 
import QuizQuestionRoutes from './Kanbas/Courses/Quizzes/QuizQuestions/routes.js';
import QuizSubmissionRoutes from './Kanbas/Courses/Quizzes/QuizSubmissions/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
    origin: [
        process.env.NETLIFY_URL,
        "http://localhost:3000" ,
        "https://kanbas-web-cs5610fa24-final-chiehyu.netlify.app",
        "https://kanbas-react-web-app-cs5610-fa24-a6.netlify.app"
    ]
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app); 
QuizRoutes(app);
QuizQuestionRoutes(app);
QuizSubmissionRoutes(app);

Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000)