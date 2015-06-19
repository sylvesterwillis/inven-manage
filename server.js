var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Item       = require('./app/models/item');

mongoose.connect('mongodb://localhost:27017/inven-manage');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/items')
// create a bear (accessed at POST http://localhost:8080/api/bears)
.post(function(req, res) {
        
    var item = new Item();      // create a new instance of the Bear model
    item.name = req.body.name;  // set the bears name (comes from the request)
    item.quantityInStock = req.body.quantityInStock;
    item.quantityGiven = 0;

    // save the bear and check for errors
    item.save(function(err) {
        if (err) {
            res.send(err);
        }

        res.json(req.body);
    });
        
})
.get(function(req, res) {
    Item.find(function(err, items) {
        if(err) {
            res.send(err);
        }

        res.json(items);
    });
});

router.route('/items/:item_id')
.get(function(req, res) {
    Item.findById(req.params.item_id, function(err, item){
        if(err) {
            res.send(err);
        }

        res.json(item);
    });
})
.put(function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {
        if(err) {
            res.send(err);
        }

        item.name = req.body.name;  // set the bears name (comes from the request)
        item.quantityInStock = req.body.quantityInStock;
        item.quantityGiven = 0;

        item.save(function(err) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Item updated!' });
        });
    });
})
.delete(function(req, res) {
    Item.remove({ _id: req.params.item_id }, function(err, item) {
        if(err) {
            res.send(err);
        }

        res.json({ message: 'Successfully deleted.' });
    });
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
