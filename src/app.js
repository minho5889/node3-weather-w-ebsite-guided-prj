const path = require('path') // needs to be absolute path from root of the machine
const express = require('express') // express is a function not an object
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express() // does not take any argument
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directorey to serve
app.use(express.static(publicDirectoryPath)) // a way to customize a server

app.get('', (req, res) => { // this has two parameters, one for path and the other for function (req for request, res for response)
    res.render('index', {
      title: 'Weather',
      name: 'Andrew Mead',
      foot: 'the end'
    })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About me',
    name: 'Andrew Mead',
    foot: 'the end'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Minho Lee',
    foot: 'the end'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({  // http request can send only one msg at once
      error: 'No address. You must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location, // = location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({  // http request can send only one msg at once
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res)=> {
  res.render('404', {
    title: '404',
    name: 'Minho lee',
    errorcode: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Minho lee',
    errorcode: 'Page not found.'
  })
})

// starting server up
app.listen(port, () => {
  console.log('Server is up on port' + port)
})