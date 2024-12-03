const express = require('express');
const Source = require('../Controller/SourceController')
const authmiddleware = require("../Middleware/authMiddleware")





const SourceRoute = express.Router();

SourceRoute.post("/",authmiddleware,Source.addSource)
SourceRoute.get("/",authmiddleware,Source.getSource)
SourceRoute.delete("/:id",authmiddleware,Source.Sourcedelete)
SourceRoute.put("/:id",authmiddleware,Source.Sourceupdate)



module.exports = SourceRoute;
