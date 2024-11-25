const express = require('express');
const control = require('../Controller/ClientController')



const ClientRoute = express.Router();

ClientRoute.post("/",control.addClient)
ClientRoute.get("/",control.getClient)
ClientRoute.get("/:id",control.getClientbyid)
ClientRoute.delete("/:id",control.Clientdelete)
ClientRoute.put("/:id",control.Clientupdate)


module.exports = ClientRoute;
