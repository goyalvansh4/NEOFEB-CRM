const express = require('express');
const control = require('../Controller/ClientController')
const authMiddleware = require('../Middleware/authMiddleware')


const ClientRoute = express.Router();

ClientRoute.post("/",authMiddleware,control.addClient)
ClientRoute.get("/",authMiddleware,control.getClient)
ClientRoute.get("/:id",authMiddleware,control.getClientbyid)
ClientRoute.delete("/:id",authMiddleware,control.Clientdelete)
ClientRoute.put("/:id",authMiddleware,control.Clientupdate)


module.exports = ClientRoute;
