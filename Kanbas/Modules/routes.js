import * as modulesDao from "./Modulesdao.js";

export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });
    app.put("/api/modules/:moduleId",async  (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        await modulesDao.updateModule(moduleId, moduleUpdates);
        res.sendStatus(204);
    });

    app.delete("/api/modules/:moduleId",async  (req, res) => {
        const { moduleId } = req.params;
        await modulesDao.deleteModule(moduleId);
        res.sendStatus(204);
    });

    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
      });

        // Move the POST route inside the function
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

    
}
