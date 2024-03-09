const ApiError = require("../Api-err/Api-error")
const City = require("../models/City")
const Groups = require("../models/Groups")
const Location = require("../models/Location")

  
class LocationService {
    async getLocations() {
        try {
            var locationsForUser = []
            var locations = await Location.find()
            var groups = await Groups.find()

            locations.forEach(location => {
                var user = {id: location.id, name: location.name, city_id: location.city_id}
                var group = groups.find(group => {
                    return group._id.equals(location.groups)
                })
                user.groups = group.groups
                locationsForUser.push(user)
            })

            return locationsForUser
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

