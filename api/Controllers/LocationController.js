const locationService = require("../Services/LocationService");

class LocationController {
  async getLocation(req, res, next) {
    try {
      const locations = await locationService.getLocations()
      res.json(locations)
    } catch(e) {
      next(e)
    }
  }
  async getCityInfo(req, res, next) {
    try {
      const city = await locationService.getCityInfo()
      res.json(city)
    } catch(e) {
      next(e)
    }
  }
}
module.exports = new LocationController();