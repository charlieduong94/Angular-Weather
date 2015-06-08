var express = require("express");
var fs = require("fs");
var bodyparser = require("body-parser");
var root = __dirname;

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', function(req, res){
  fs.readFile('index.html', 'utf8', function(err, data){
    if (err) {
			return console.log(err);	
		}
		res.send(data);
  });
});

app.use(express.static(__dirname + '/'));


app.listen(8080, '0.0.0.0');