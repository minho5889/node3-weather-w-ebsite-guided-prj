const request = require("request")


const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=36acffd495b3e204d169f243762ced5f&query=${lat},${lng}&units=f`

  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather services!', undefined)
    } 
    else if(body.error) {
      callback('Unable to find the location!', undefined)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out.`)
    }
  })
}

module.exports = forecast

