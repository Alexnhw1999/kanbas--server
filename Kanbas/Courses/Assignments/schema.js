import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString()},
    title: { type: String, required: true },
    course: { type: String, required: true },
    description: String,
    points: Number,
    dueDate: Date,
    availableFrom: Date,
    availableUntil: Date,
    group: String,
    submissionType: String
}, { collection: "assignments" });

export default assignmentSchema;