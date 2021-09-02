const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoibWluaG81ODg5IiwiYSI6ImNrc3VoczRrYjBpanYyd3A2OTBsYjJzdHMifQ.hQwd93d4eebDAvKzd4oAXA&limit=1'

  request({url, json: true}, (error, body) => {
    if(error) {
        callback('Unable to connect to location services!', undefined) 
    } else if(!body.body.features.length) {
        callback('Unable to find location. Try another search.', undefined)
    } else {
        callback(undefined, {
            latitude: body.body.features[0].center[0],
            longitude: body.body.features[0].center[1],
            location: body.body.features[0].place_name
        })
    }
  })
}

module.exports = geocode

// geocode('Boston', (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })
