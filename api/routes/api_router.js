const Router = require("express").Router;
const locationController = require("../Controllers/LocationController");


const route = new Router();
route.get("/getLocation", locationController.getLocation);
route.get("/getCityInfo", locationController.getCityInfo)

module.exports = route;