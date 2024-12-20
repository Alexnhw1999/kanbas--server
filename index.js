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

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);
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

Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000)