import * as assignmentsDao from "./AssignmentDao.js";

export default function AssignmentRoutes(app) {
 // Update assignment
 app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(updatedAssignment);
});

// Delete assignment
app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
});

// Get assignments for course
app.get("/api/courses/:courseId/assignments", (req, res) => { 
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);  
    res.json(assignments);
});

// Create new assignment
app.post("/api/courses/:courseId/assignments", (req, res) => { 
    const assignment = {
        ...req.body,
        course: courseId, 
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);  
    res.json(newAssignment);
});
    
}