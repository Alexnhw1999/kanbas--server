import model from "./model.js";
export const updateModule = async (moduleId, moduleUpdates) => {
  try {
    // Find the existing module first
    const module = await model.findById(moduleId);
    if (!module) {
      throw new Error("Module not found");
    }
    
    // Update module fields
    if (moduleUpdates.name) module.name = moduleUpdates.name;
    if (moduleUpdates.description) module.description = moduleUpdates.description;
    
    // Save the updated module
    await module.save();
    return module;
  } catch (error) {
    console.error("Error updating module:", error);
    throw error;
  }
};
  
export const deleteModule = async (moduleId) => {
  const status = await model.deleteOne({ _id: moduleId });
  return status;
};

export const findModulesForCourse = async (courseId) => {
  const modules = await model.find({ course: courseId });
  return modules;
};

export const createModule = async (module) => {
  const newModule = await model.create(module);
  return newModule;
};