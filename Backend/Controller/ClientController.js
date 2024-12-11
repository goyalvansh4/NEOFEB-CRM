const Client = require("../Models/Client");
const Invoice = require("../Models/Invoice");

const addClient = async (req, res) => {
  const {
    name,
    email,
    phone_number,
    company_name,
    pan,
    cin,
    gst_number,
    tan,
    country,
    state,
    city,
    pincode,
    address,
    bank_name,
    bank_account,
    ifsc_code,
    upi_id,
    status,
  } = req.body;

  try {
    await Client.create({
      name,
      email,
      phone_number,
      company_name,
      pan,
      cin,
      gst_number,
      tan,
      country,
      state,
      city,
      pincode,
      address,
      bank_name,
      bank_account,
      ifsc_code,
      upi_id,
      status,
    });

    let response = { status: "success", msg: "Register Client Successfuly" };
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Server error", error: error.message });
  }
};

const getClient = async (req, res) => {
  try {
    const data = await Client.find();
    let response = {
      status: "success",
      msg: "Get Client Successfuly",
      data: data,
    };
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Server error", error: error.message });
  }
};

const getClientbyid = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate("invoice");
    const invoices = await Invoice.find({ client_id: req.params.id });
    if (!client) {
      return res.status(404).json({ status: "error", msg: "Client not found" });
    }
    let response = {
      status: "success",
      msg: "Client details fetched Successfuly",
      data: { client, invoices },
    };
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Server error", error: error.message });
  }
};

const Clientdelete = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    const response = { status: "success", msg: "Client Delete Sucessfully" };
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Server error", error: error.message });
  }
};

const Clientupdate = async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      company_name,
      pan,
      cin,
      gst_number,
      tan,
      country,
      state,
      city,
      pincode,
      address,
      bank_name,
      bank_account,
      ifsc_code,
      upi_id,
      status,
    } = req.body;

    const data = {
      name,
      email,
      phone_number,
      company_name,
      pan,
      cin,
      gst_number,
      tan,
      country,
      state,
      city,
      pincode,
      address,
      bank_name,
      bank_account,
      ifsc_code,
      upi_id,
      status,
    };

    const client = await Client.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!client) {
      return res.status(404).json({ status: "error", msg: "Client not found" });
    }
    ``;

    res.json({ status: "success", msg: "Client updated successfully", client });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", msg: "Server error", error: error.message });
  }
};

module.exports = {
  addClient,
  getClient,
  getClientbyid,
  Clientdelete,
  Clientupdate,
};
