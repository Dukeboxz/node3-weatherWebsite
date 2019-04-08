const path = require('path');
const express = require('express'); 
const hbs = require('hbs'); 
const geocode = require('./utils/geocode'); 
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000

//define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
            title: 'Weather App', 
            name: 'Stephen Jackson'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me', 
        name: 'Stephen Jackson'
    } )
})
app.get('/help', (req,res)=>{
    res.render('help', {
        name: 'Stephen', 
        message: 'Come Here To Get The Help You Need', 
        title: 'Help'
    })
})


app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must proive a location'
        })
    }

    geocode(req.query.address, (error, { placeName, latitude, longtitude} = {} )=>{


        if(error){
      
          return  res.send({
              error: 'Could not find location'
          }); 
        }
        forecast(longtitude, latitude, (error, {dailySummary:currentSummary, currentTemp, chanceOfRain})=> {
      
          if(error){
           return  res.send({
                error: 'could not get forecast for location'
            });
          }
           
          return res.send({
              forecastSummary: 'The forecast for ' + placeName + ' is ' + currentSummary + 
              ' The current temp is ' + currentTemp +' with a ' + chanceOfRain + 
              ' % chance of rain', 
              givenlocation: req.query.address,
              temperature: currentTemp, 
              chanceOfRain: chanceOfRain
          })
         
         
        })
      })



})

app.get('/products', (req, res)=>{
    
    if(!req.query.search){
        return  res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get("/help/*", (req, res)=>{

   res.render('404',
        {
            error: 'Help Article Not Found', 
            name:'Stephen', 
            title: '404 Error'
        }
    )
})

app.get('*', (req, res)=>{

    res.render('404',{
        error: 'Page Not Found', 
        name: 'Stephen', 
        title: '404 Error'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)