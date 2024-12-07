import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { type: String, ref: "CourseModel" },
    _id: { 
      type: String, 
      default: () => new mongoose.Types.ObjectId().toString() 
    }
  },
  { collection: "modules" }
);

export default schema;