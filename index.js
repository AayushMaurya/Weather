const express = require("express");
const path = require('path');

const app = express();
app.set('view engine', 'ejs');//set up the view engine
app.set('views', path.join(__dirname, 'views'));//set up the view path
app.use(express.urlencoded());
app.use(express.static('assets'));

// app.get("/", function(req, res){
//     res.sendFile(__dirname + "/home.html");
//     console.log(__dirname);
// });



const https = require('https');

let url = "https://api.weatherapi.com/v1/current.json?key=c321b2ec130a4242b02205900212906&q=London&aqi=no";

https.get(url, (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            console.log(json.current.humidity)
            app.get("/", (req, res, next) => {

                return res.render('home',
                    {
                        title: "weather",
                        location:json.location.name,
                        tempval:json.current.temp_c,
                        windval:json.current.wind_mph,
                        humidity:json.current.humidity,
                        pressure:json.current.pressure_in
                    });
            });
            console.log(json.location);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

app.listen(8000);


// const homePage = fs.readFileSync('home.html', 'utf-8');

// const server = http.createServer(function (request, response) {
//     if(request.url == "/")
//     {

//         console.log(homePage);
//         response.write(homePage);
//         response.end();
//         // const stream = requests("http://api.weatherapi.com/v1/current.json?key=c321b2ec130a4242b02205900212906&q=London&aqi=no");

//         // stream.on("data", function(chunk){
//         //     const objData = JSON.parse(chunk);
//         // });        

//         // stream.on("end", function(err){
//         //     if(err)
//         //         throw err;
//         //     console.log("stream is ended");
//         //     response.end();
//         // });
//     }
// });

// server.listen(8000, "127.0.0.1", function(){
//     console.log("server started");
// });