const project = require('../Models/Projects');

const createProject = async (req, res) => {
    try {
        const project = new project(req.body);
        await project.save();
        res.status(201).json({ status: "success", msg: "Project Created SuccessFully", data: project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getProjects = async (req, res) => {
    try {
        const project = await project.find();
        res.status(200).json({ status: "success", msg: "Project Fetched SuccessFully", data: project });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getProject = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const project = await project.findById(_id).populate('client_id').populate('assigned_to','employee_name,employee_email');
        res.status(200).json({ status: "success", msg: "Project Fetched SuccessFully", data: project });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateProject = async (req, res) => {
    const { id: _id } = req.params;
    const project = req.body;
    try {
        const updatedProject = await project.findByIdAndUpdate(_id, project, { new: true });
        res.status(200).json({ status: "success", msg: "Project Updated SuccessFully", data: updatedProject });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



const deleteProject = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const deletedProject = await project.findByIdAndDelete(_id);
        res.status(200).json({ status: "success", msg: "Project Deleted SuccessFully", data: deletedProject });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports = { createProject, getProjects, getProject, updateProject, deleteProject };

