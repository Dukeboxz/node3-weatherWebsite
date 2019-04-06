const request = require('request'); 

const forecast = (longitude, latitude, callback) =>{
    
    const url = 'https://api.darksky.net/forecast/e452c83f46932af4c889f2e4c5c804a7/' + encodeURIComponent(latitude) + 
    ',' + encodeURIComponent(longitude) + '?units=si'

    request({url, json:true},(error, response)=>{

        if(error){
            callback('Unable to connect to location services'); 
        } else if(response.body.error){
            callback(response.body.error)
        } else{
            const data = {
                dailySummary: response.body.daily.data[0].summary, 
                currentTemp: response.body.currently.temperature, 
                chanceOfRain: response.body.currently.precipProbability
            }

            callback(undefined, data); 
        }
    } )

     
}

module.exports = forecast;