var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path       = require("path");
var ItemApi    = require('./app/routes/item');

mongoose.connect('mongodb://localhost:27017/inven-manage');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup static directories
app.use("/vendor", express.static(__dirname + '/vendor'));
app.use("/static", express.static(__dirname + '/static'));

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router


router.get('/', function(req, res) {
    res.sendfile(path.join(__dirname+'/index.html'));
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api', ItemApi);

app.listen(port);
console.log('Magic happens on port ' + port);
