var express    = require('express');
var Item       = require('../models/item');

module.exports = (function() {
    'use strict';
    var itemApi = express.Router();

    itemApi.route('/items')
    .get(function(req, res) {
        Item.find(function(err, items) {
            if(err) {
                res.send(err);
            }

            res.json(items);
        });
    })
    // create a bear (accessed at POST http://localhost:8080/api/items)
    .post(function(req, res) {
            
        var item = new Item();      // create a new instance of the Item model
        item.name = req.body.name;  // set the item name (comes from the request)
        item.quantityInStock = req.body.quantityInStock;
        item.quantityGiven = 0;

        // save the item and check for errors
        item.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json(req.body);
        });
            
    });

    itemApi.route('/items/:item_id')
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

            item.name = req.body.name;  // set the item name (comes from the request)
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

    return itemApi;
})();