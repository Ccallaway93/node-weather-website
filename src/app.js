const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()


//  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Conner Callaway'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Conner Callaway'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Conner Callaway',
        message: 'Something went wrong, please contact IT!'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })


    })

    // res.send({
    //     forecast: 'High of 95',
    //     location: 'Houston',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Conner Callaway',
        errorMessage: 'Help article not found.'
    })
})


//  Use the Wildcard character to match anything that has not been matched
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Conner Callaway',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})