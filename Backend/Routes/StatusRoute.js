const express = require('express');
const Status = require('../Controller/StatusController')
const authmiddleware = require("../Middleware/authMiddleware")




const StatusRoute = express.Router();

StatusRoute.post("/",authmiddleware,Status.addStatus)
StatusRoute.get("/",authmiddleware,Status.getStatus)
StatusRoute.delete("/:id",authmiddleware,Status.Statusdelete)
StatusRoute.put("/:id",authmiddleware,Status.Statusupdate)



module.exports = StatusRoute;
