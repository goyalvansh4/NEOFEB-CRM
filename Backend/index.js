require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");




const EmployeeRoute = require("./Routes/EmployeeRoute");
const ClientRoute=require("./Routes/ClientRoute")



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/employee", EmployeeRoute);
app.use("/client",ClientRoute)


app.listen(4000, () => {
  console.log("Server Start");
});
