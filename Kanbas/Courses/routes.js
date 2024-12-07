import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) { 
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  });
 
 
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });
 
  app.post("/api/courses", async (req, res) => {
  const course = await dao.createCourse(req.body);
  res.json(course);
});

  app.get("/api/users/current/courses",async(req, res) => {
    const userId = req.session['currentUser']._id;
    const courses =await dao.findCoursesByUserId(userId);
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
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    await dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(204);
  });

  app.get("/api/courses", async  (req, res) => {
    try {
      const courses =  await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Could not fetch all courses" });
    }
  });
}

