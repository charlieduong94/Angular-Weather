var express = require("express");
var app = express();
var apiKey = "";
app.get("/hello", function(req, res){
  res.send("Hello");
});

app.post("/weather", function(req,res){
  // make http request to forecast.io
  // res.send data back
});

app.listen(8080);