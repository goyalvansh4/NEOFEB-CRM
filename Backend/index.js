require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const PORT=process.env.PORT || 3000


const baseURL = process.env.BASE_URL;

const EmployeeRoute = require("./Routes/EmployeeRoute");
const ClientRoute=require("./Routes/ClientRoute")
const adminRoute = require("./Routes/AdminRoute");
const LeadRoute = require("./Routes/LeadsRoute")
const SourceRoute = require("./Routes/SourceRoute")
const StatusRoute = require("./Routes/StatusRoute")
const InvoiceRoute = require("./Routes/InvoiceRoute");
const InvoiceStatusRoute = require("./Routes/InvoiceStatusRoute");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(`${baseURL}/employee`, EmployeeRoute);
app.use(`${baseURL}/client`,ClientRoute)
app.use(`${baseURL}/admin`, adminRoute);
app.use(`${baseURL}/lead`, LeadRoute);
app.use(`${baseURL}/source`,SourceRoute);
app.use(`${baseURL}/leadStatus`,StatusRoute);
app.use(`${baseURL}/invoice`, InvoiceRoute);
app.use(`${baseURL}/invoiceStatus`, InvoiceStatusRoute);


app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
