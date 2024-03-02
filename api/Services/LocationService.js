const ApiError = require("../Api-err/Api-error")
const City = require("../models/City")
const Location = require("../models/Location")

class LocationService {
    async getLocations() {
        try {
            const location = await Location.find()
            return location
        } catch(e) {
            throw new ApiError.BDError()
        }
    }
    async getCityInfo() {
        try {
            const city = await City.find()
            return city
        } catch(e) {
            throw new ApiError.BDError()
        }
    }
}
module.exports = new LocationService();

