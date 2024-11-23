import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  app.get("/api/users/current/courses", (req, res) => {
    const userId = req.session['currentUser']._id;
    const courses = dao.findCoursesByUserId(userId);
    res.json(courses);
  });

  // Create course for current user
  app.post("/api/users/current/courses", (req, res) => {
    try {
      const userId = req.session['currentUser']._id;
      const course = req.body;
      const newCourse = dao.createCourse(course);
      dao.enrollUserInCourse(userId, newCourse._id);
      res.json(newCourse);
    } catch (error) {
      res.status(400).json({ error: "Could not create course" });
    }
  });

  // Delete course
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  });

  // Update course
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(204);
  });

  app.get("/api/courses", (req, res) => {
    try {
      const courses = dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Could not fetch all courses" });
    }
  });
}

