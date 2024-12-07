import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export async function findAllCourses() {
  try {
    const courses = await model.find().lean();
    return courses; 
  } catch (error) {
    console.error("Error finding all courses:", error);
    return [];
  }
}

export async function createCourse(course) {
 try {
   // Check for duplicate in MongoDB
   const isDuplicate = await model.findOne({
     number: new RegExp(`^${course.number}$`, 'i')
   });

   if (isDuplicate) {
     console.log(`Course with number ${course.number} already exists`);
     return null;
   }

   delete course._id;
   return await model.create(course);
 } catch (error) {
   console.error("Error creating course:", error);
   throw error;
 }
}

export async function deleteCourse(courseId) {
 try {
   // Delete the course document
   const result = await model.deleteOne({ _id: courseId });
   
   if (result.deletedCount > 0) {
     await enrollmentModel.deleteMany({ course: courseId });
   }
   
   return result;
 } catch (error) {
   console.error("Error deleting course:", error);
   throw new Error(`Failed to delete course: ${error.message}`);
 }
}

export async function updateCourse(courseId, courseUpdates) {
 try {
   return await model.updateOne(
     { _id: courseId }, 
     { $set: courseUpdates }
   );
 } catch (error) {
   console.error("Error updating course:", error);
   throw error;
 }
}

export async function findCoursesForEnrolledUser(userId) {
  try {
    const enrollments = await enrollmentModel.find({ user: userId });
    if (!enrollments || enrollments.length === 0) {
      console.log("No enrollments found for user:", userId);
      return [];  // Return empty array if no enrollments
    }

    const courseIds = enrollments.map(e => e.course);

    const courses = await model.find({ _id: { $in: courseIds } }).lean();

    // Ensure we return an array even if no courses found
    return Array.isArray(courses) ? courses : [];

  } catch (error) {
    console.error("Error finding enrolled courses:", error);
    return []; // Return empty array on error rather than throwing
  }
}