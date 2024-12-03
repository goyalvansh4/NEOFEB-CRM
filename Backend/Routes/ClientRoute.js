const express = require('express');
const control = require('../Controller/ClientController')
const authmiddleware= require("../Middleware/authMiddleware")



const ClientRoute = express.Router();

ClientRoute.post("/",authmiddleware,control.addClient)
ClientRoute.get("/",authmiddleware,control.getClient)
ClientRoute.get("/:id",authmiddleware,control.getClientbyid)
ClientRoute.delete("/:id",authmiddleware,control.Clientdelete)
ClientRoute.put("/:id",authmiddleware,control.Clientupdate)


module.exports = ClientRoute;
