
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await dao.findEnrollmentsByCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ 
        message: "Error fetching enrollments",
        error: error.message 
      });
    }
  });

 
  app.post("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = req.body.user;

      // Check if already enrolled
      const isEnrolled = await dao.isUserEnrolled(userId, courseId);
      if (isEnrolled) {
        return res.status(409).json({ 
          message: "User already enrolled in this course" 
        });
      }

      const newEnrollment = await dao.enrollUserInCourse(userId, courseId);
      res.status(201).json(newEnrollment);
    } catch (error) {
      console.error("Enrollment error:", error);
      res.status(500).json({ 
        message: "Error processing enrollment",
        error: error.message 
      });
    }
  });

  // DELETE route for unenrolling
  app.delete("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = req.body.user;
      await dao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error unenrolling:", error);
      res.status(500).json({ 
        message: "Error processing unenrollment",
        error: error.message 
      });
    }
  });

  

}