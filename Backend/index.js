require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");

// env variables
const PORT = process.env.PORT || 8000;
const baseURL = process.env.BASE_URL;



// Routes import
const EmployeeRoute = require("./Routes/EmployeeRoute");
const ClientRoute=require("./Routes/ClientRoute")
const adminRoute = require("./Routes/adminRoute");
const LeadRoute=require("./Routes/leadRoute");


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`${baseURL}/employee`, EmployeeRoute);
app.use(`${baseURL}/client`,ClientRoute);
app.use(`${baseURL}/admin`, adminRoute);
app.use(`${baseURL}/lead`,LeadRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
