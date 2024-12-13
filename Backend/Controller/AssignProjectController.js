const Employee = require('../Models/Employees');
const Project = require('../Models/Projects');


const assignProjectToEmployee = async () => {
  const { empId, projectId } = req.body;
  try {
    // Add project_id to employee's projects array
    const employeeUpdate = await Employee.findByIdAndUpdate(
      empId,
      { $addToSet: { projects: projectId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    // Add emp_id to project's assigned_to array
    const projectUpdate = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { assigned_to: empId } },
      { new: true }
    );

    if (employeeUpdate && projectUpdate) {
      console.log('Assignment successful');
      return { employee: employeeUpdate, project: projectUpdate };
    } else {
      throw new Error('Employee or Project not found');
    }
  } catch (error) {
    console.error('Error assigning project to employee:', error.message);
    throw error;
  }
}; 


module.exports = { assignProjectToEmployee };
