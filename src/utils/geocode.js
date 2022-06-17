const request = require('postman-request')
const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=2d17e5f5b984c79d4b99635be948f579`
    request({ url, json: true}, (error, response, body) => {
        if(error) return console.log(chalk.bold.inverse.red('Connection Failed!'))
        if(body && body.cod !== 200) return console.log(chalk.bold.inverse.red(`Geocode Api Error, ${body.message}`))
        const data = {
            location: body.name,
            longitude: body.coord.lon,
            latitude: body.coord.lat,
        }
        callback(data)
    })
}

module.exports = geocode