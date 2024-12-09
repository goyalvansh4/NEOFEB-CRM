const express = require('express');
const { addStatus, getStatus, Statusdelete, Statusupdate } = require('../Controller/StatusController');
const authmiddleware = require("../Middleware/authMiddleware")


const StatusRoute = express.Router();

StatusRoute.post("/",authmiddleware,addStatus)
StatusRoute.get("/",authmiddleware,getStatus)
StatusRoute.delete("/:id",authmiddleware,Statusdelete)
StatusRoute.put("/:id",authmiddleware,Statusupdate)



module.exports = StatusRoute;
