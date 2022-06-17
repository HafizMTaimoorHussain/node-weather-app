const express = require('express')
const app = express()
const creatorName = 'Taimoor Hussain'
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //res.send('Hello Express!')
    res.render('index', {
        title: 'Home',
        name: creatorName
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: creatorName
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: creatorName
    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 'Not found',
        name: creatorName
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address || address === '') return res.send({ error: 'You must provide an address!' })
    
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if(error) return res.send({ error })
        
        forecast(latitude, longitude, (error, body) => {
            if(error) return res.send({ error })

            console.log(body)
            res.send({
                //forecast: `Mainly ${body.weather[0].main} and ${body.weather[0].description}. It is currently ${body.main.temp} degrees out. But it feels like ${body.main.feels_like} degrees out.`,
                //location: location + "," + " " + body.sys.country,
                address,
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: creatorName
    })
})

app.listen(port, () => console.log('Local server is up on port ' + port))