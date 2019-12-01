const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/5a12d2b4f48ac051f667689167be22c7/' + latitude + ',' + longitude

request({url, json: true }, (error, {body}) => {
    if (error){
        callback('Unable to connect to weather service!', undefined)
    }
    else if (body.error){
        callback('Unable to find location',undefined)
    }
    else{
        callback(undefined, {
            summary: body.daily.data[0].summary,
            temperature: body.currently.temperature,
            precipiataion: body.currently.precipProbability
        })
        // console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out.' + ' There is a ' + response.body.currently.precipProbability + '% change of rain.')
    }
})

}
module.exports = forecast