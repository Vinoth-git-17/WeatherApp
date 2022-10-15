const express = require("express");

const bodyParser=require('body-parser');

const https = require("https");

const app = express();


app.set("view engine", "ejs");


app.use(express.static("public"))


app.use(bodyParser.urlencoded({extended:true}))



app.get("/", function(req, res){


    res.sendFile(__dirname + "/index.html");

    
   
   
})




app.post("/",function(req,res){
    console.log(req.body.cityName)

   const query =req.body.cityName;
   const appId ="d3bcb2501b7fa0ed5ea247df2c8f6969";
   const units = "metric";

    const url =" https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ appId + "&units="+ units 
    console.log(url)


    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on('data', function(data){
           const Weatherdata =JSON.parse(data)
           var temp = Weatherdata.main.temp + "°C";
            console.log(temp);
           
            res.render("temp",{value : temp})
            // res.send("<h1>The temperature of "+ query +" is " + temp +" Celsius</h1>");
        })
    
    })
    
})


app.listen(process.env.PORT || 3000,function(){
    console.log("3000 is started");
})
