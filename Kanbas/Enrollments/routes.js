
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsByCourse(courseId);
    res.json(enrollments);
  });

  app.post("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const enrollment = { ...req.body, course: courseId };
    const newEnrollment = dao.createEnrollment(enrollment);
    res.json(newEnrollment);
  });

  app.delete("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const userId = req.body.user; 
    dao.deleteEnrollment(userId, courseId);
    res.sendStatus(204);
  });

}