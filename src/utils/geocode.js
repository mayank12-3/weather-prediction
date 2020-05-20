const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF5YW5rNDYiLCJhIjoiY2thM3YwMHJsMG81eDNocG55OWNwdG9naSJ9.H8yVa25bCRQvS5IAjBUJIQ&limit=1'
  request({ url, json: true }, (error,response) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (response.body.features.length === 0) {
      callback('unable to find location', undefined)
    } else {
      callback(undefined, {
         lat: response.body.features[0].center[1],
         long: response.body.features[0].center[0],
         location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode