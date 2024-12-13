const EmployeesModel = require("../Models/Employees");

const createEmployees = async (req, res) => {
    try {
        const employee = new EmployeesModel(req.body);
        await employee.save();
        res.status(201).json({ status: "success", msg: "Employee Created SuccessFully", data: employee });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getEmployees = async (req, res) => {
    try {
        const employee = await EmployeesModel.find();
        res.status(200).json({ status: "success", msg: "Employee Fetched SuccessFully", data: employee });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getEmployeebyid = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const employee = await EmployeesModel.findById(_id);
        res.status(200).json({ status: "success", msg: "Employee Fetched SuccessFully", data: employee });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const updateEmployees = async (req, res) => {
    const { id: _id } = req.params;
    const employee = req.body;
    try {
        const updatedEmployee = await EmployeesModel.findByIdAndUpdate(_id, employee, { new: true });
        res.status(200).json({ status: "success", msg: "Employee Updated SuccessFully", data: updatedEmployee });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const deleteEmployees = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const deletedEmployee = await EmployeesModel.findByIdAndDelete(_id);
        res.status(200).json({ status: "success", msg: "Employee Deleted SuccessFully", data: deletedEmployee });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = { createEmployees, getEmployees, getEmployeebyid, updateEmployees, deleteEmployees };
