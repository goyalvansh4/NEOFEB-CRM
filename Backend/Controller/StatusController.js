const leadStatusModel = require("../Models/Status");

const addStatus = async (req, res) => {
  const { leadStatus, description } = req.body;

  if (!leadStatus) {
    return res.status(400).json({ status: "error", msg: "Status is required" });
  }
  try {
    const LeadStatus =await leadStatusModel.create({
      leadStatus,
      description,
    });

    let response = {
      status: "success",
      msg: "Status create Successfuly",
      data: LeadStatus,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
  }
};

const getStatus = async (req, res) => {
  try {
    const data = await leadStatusModel.find();

    let response = {
      status: "success",
      msg: "Get Status Successfuly",
      data: data,
    };
    res.json(response);
  } catch (error) {
    console.log("status not Found");
  }
};

const Statusdelete = async (req, res) => {
  try {
    const status = await leadStatusModel.findByIdAndDelete(req.params.id);
    const response = { status: "success", msg: "Status Deleted Sucessfully" };
    res.json(response);
  } catch (error) {
    console.log("Status not delete");
  }
};

const Statusupdate = async (req, res) => {
  try {
    const { name, description } = req.body;

    const data = {
      name,
      description,
    };

    const status = await leadStatusModel.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      }
    );

    if (!status) {
      return res.status(404).json({ status: "error", msg: "Status not found" });
    }
    ``;

    res.json({ status: "success", msg: "Status updated successfully", status });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Server error", error: error.message });
  }
};

module.exports = { addStatus, getStatus, Statusdelete, Statusupdate };
