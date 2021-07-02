const express = require("express");
const path = require('path');
const app = express();
app.set('view engine', 'ejs');//set up the view engine
app.set('views', path.join(__dirname, 'views'));//set up the view path
app.use(express.urlencoded());
app.use(express.static('assets'));


const https = require('https');

let url = "https://api.weatherapi.com/v1/current.json?key=c321b2ec130a4242b02205900212906&q=india&aqi=no";

https.get(url, (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            console.log(json.current.condition.icon)
            app.get("/", (req, res, next) => {

                return res.render('home',
                    {
                        title: "weather",
                        location:json.location.name,
                        tempval:json.current.temp_c,
                        windval:json.current.wind_mph,
                        humidity:json.current.humidity,
                        pressure:json.current.pressure_in,
                        icon:json.current.condition.icon,
                        text:json.current.condition.text

                    });
            });
         
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

app.listen(8000);


