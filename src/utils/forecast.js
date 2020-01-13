const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8f4bf50aae4b4ec8667979bde3727748/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable connect to weather service !', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {

            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degree out .This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + ' There is a ' + body.currently.precipProbability)
        }
    })
}

module.exports = forecast