
const apiUrl = "http://localhost:3001/api"
class ApiModule {
    static async getLocations() {
        const locations = await fetch(apiUrl + "/getLocation")
        const json = await locations.json()
        return json
    }
    static async getCity() {
        const locations = await fetch(apiUrl + "/getCityInfo")
        const json = await locations.json()
        return json
    }
}

export default ApiModule