import model from "./model.js";

export const findEnrollmentsByCourse = async (courseId) => {
  const enrollments = await model.find({ 
    course: courseId,
    status: "ENROLLED"  // Only return active enrollments
  }).populate("user");
  return enrollments;
};

export const createEnrollment = async (enrollment) => {
  // First check if enrollment exists
  const existing = await model.findOne({
    user: enrollment.user,
    course: enrollment.course
  });

  if (existing) {
    if (existing.status === "ENROLLED") {
      return existing;
    }
    // If exists but dropped, reactivate it
    existing.status = "ENROLLED";
    return await existing.save();
  }

  // Create new enrollment with status
  return await model.create({
    ...enrollment,
    status: "ENROLLED"
  });
};

export const isUserEnrolled = async (userId, courseId) => {
  const enrollment = await model.findOne({ 
    user: userId, 
    course: courseId,
    status: "ENROLLED"  // Only check active enrollments
  });
  return enrollment !== null;
};

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ 
    user: userId,
    status: "ENROLLED"
  }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ 
    course: courseId,
    status: "ENROLLED"  // Only get active enrollments
  }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(user, course) {
  // Use findOneAndUpdate with upsert to prevent duplicates
  return await model.findOneAndUpdate(
    { user, course },
    { 
      $set: { status: "ENROLLED" }
    },
    { 
      upsert: true,  // Create if doesn't exist
      new: true      // Return updated document
    }
  );
}

export async function unenrollUserFromCourse(user, course) {
  // Update status instead of deleting
  return await model.findOneAndUpdate(
    { user, course },
    { 
      $set: { status: "DROPPED" }
    },
    { new: true }
  );
}