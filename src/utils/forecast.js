const request = require('request')



const forecast = (lat, long, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=f270e5771fd92aef30ef69106d24b98f&query='+ lat +',' + long

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services', undefined)
    } else if (body.error) {
      callbacl('unable to find location, try another search', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.feelslike + '% chance of rain.')
    }
  })
}

module.exports = forecast
