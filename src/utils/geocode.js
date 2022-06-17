const request = require('postman-request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=2d17e5f5b984c79d4b99635be948f579`
    request({ url, json: true }, (error, { body }) => {
        if(error) return callback('Unable to connect to location services!', undefined)
        if(body && body.cod !== 200) return callback('Unable to find location. Try another search.', undefined)
        const data = {
            location: body.name,
            longitude: body.coord.lon,
            latitude: body.coord.lat,
        }
        callback(undefined, data)
    })
}

module.exports = geocode