const request = require('postman-request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2d17e5f5b984c79d4b99635be948f579&units=metric`
    request({ url, json: true}, (error, response, body) => {
        if(error) return console.log(chalk.bold.inverse.red('Connection Failed!'))
        if(body && body.cod !== 200) return console.log(chalk.bold.inverse.red('Weather Api Error, ' + body.message))
        callback(body)
    });
}

module.exports = forecast