const express = require('express')
const app = express()
const request = require('request');
const bodyParser = require('body-parser');
const apiKey = '208bae990104531678770b28a3357db8';

//Express wont allow access to this file by default, so we need to expose it 
//allows us to access all of the static files within the ‘public’ folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//set up our template engine with this line of code
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weather = JSON.parse(body)
          if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
          } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('index', {weather: weatherText, error: null});
          }
        }
      });
    })


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})