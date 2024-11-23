import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export const deleteEnrollment = (userId, courseId) => {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    enrollment => !(enrollment.user === userId && enrollment.course === courseId)
  );
};

export const unenrollUserFromCourse = (userId, courseId) => {
  return deleteEnrollment(userId, courseId);
};

export const isUserEnrolled = (userId, courseId) => {
  const { enrollments } = Database;
  return enrollments.some(
    enrollment => enrollment.user === userId && enrollment.course === courseId
  );
};

export const findEnrollmentsByCourse = (courseId) => {
  return Database.enrollments.filter(
    enrollment => enrollment.course === courseId
  );
};

export const createEnrollment = (enrollment) => {
  const { enrollments } = Database;
  const newEnrollment = {
    _id: Date.now(),
    ...enrollment
  };
  enrollments.push(newEnrollment);
  return newEnrollment;
};