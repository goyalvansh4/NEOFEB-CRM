require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// env variables
const PORT = process.env.PORT || 8000;
const baseURL = process.env.BASE_URL;

// Routes import

const EmployeeRoute = require("./Routes/EmployeeRoute");
const ClientRoute = require("./Routes/ClientRoute");
const leadRoute = require("./Routes/leadRoute");
const adminRoute = require("./Routes/AdminRoute");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`${baseURL}/employee`, EmployeeRoute);
app.use(`${baseURL}/client`, ClientRoute);
app.use(`${baseURL}/admin`, adminRoute);
app.use(`${baseURL}/lead`, leadRoute);

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
