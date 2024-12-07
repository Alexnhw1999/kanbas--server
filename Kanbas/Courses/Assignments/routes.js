import * as dao from "./AssignmentDao.js";

export default function AssignmentRoutes(app) {
    // Get assignments for course
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    // Get assignment by ID
    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(assignmentId);
        res.json(assignment);
    });

    // Create new assignment
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = await dao.createAssignment(assignment);
        res.json(newAssignment);
    });

    // Update assignment
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.updateAssignment(assignmentId, req.body);
        res.json(status);
    });

    // Delete assignment
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.json(status);
    });
}