import model from "./model.js";

export const createAssignment = (assignment) => {
    return model.create(assignment);
};

export const findAssignmentsForCourse = (courseId) => {
    return model.find({ course: courseId });
};

export const updateAssignment = (assignmentId, assignment) => {
    return model.updateOne({ _id: assignmentId }, { $set: assignment });
};

export const deleteAssignment = (assignmentId) => {
    return model.deleteOne({ _id: assignmentId });
};

export const findAssignmentById = (assignmentId) => {
    return model.findById(assignmentId);
};