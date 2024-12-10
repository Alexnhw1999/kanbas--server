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
    // Validate courseId
    if (!courseId) {
      throw new Error("Course ID is required");
    }

    // First check if course exists
    const course = await model.findById(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    // Delete the course document
    const result = await model.findByIdAndDelete(courseId);
    
    if (result) {
      // Delete related enrollments
      await enrollmentModel.deleteMany({ course: courseId });
      return { success: true, message: 'Course and related enrollments deleted' };
    } else {
      throw new Error('Course deletion failed');
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

export async function updateCourse(courseId, courseUpdates) {
  try {
    // If courseUpdates contains _id, it means we're receiving the full course object
    // from the frontend updateCourse(course) call
    if (courseUpdates._id) {
      const { _id, ...updates } = courseUpdates;
      return await model.findByIdAndUpdate(
        courseId,
        { $set: updates },
        { new: true }
      );
    }
    
    // Original behavior if receiving separate updates
    return await model.findByIdAndUpdate(
      courseId,
      { $set: courseUpdates },
      { new: true }
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