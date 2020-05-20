const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const address = process.argv[2]


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather Prediction',
    name: 'Mayank Jain'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Mayank Jain'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Mayank Jain',
    message: 'do you want to help?'
  })
})


app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({ error })
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    } 
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        })
      } 
      return res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: '404',
    name: 'Mayank Jain',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mayank Jain',
    errorMessage: '404 Page not found'
  })
})

app.listen(3000, () => {
  console.log('server is up and running on 3000')
})