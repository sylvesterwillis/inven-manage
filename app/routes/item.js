var express    = require('express');
var Item       = require('../models/item');

module.exports = (function() {
    'use strict';
    var itemApi = express.Router();

    var checkItemRequestData = function(req) {
        if(!req.body.name || (req.body.quantityInStock !== 0 && !req.body.quantityInStock)) {
            return false;
        }
        else {
            return true;
        }
    };

    itemApi.route('/items')
    .get(function(req, res) {
        Item.find(function(err, items) {
            if(err) {
                res.send(err);
            }

            res.json(items);
        });
    })
    // create an item (accessed at POST http://localhost:8080/api/items)
    .post(function(req, res) {
        if(!checkItemRequestData(req)) {
            res.status(400).send("Name or quantityInStock not found.");
        }

        var item = new Item();      // create a new instance of the Item model
        item.name = req.body.name;  // set the item name (comes from the request)
        item.quantityInStock = req.body.quantityInStock;
        item.quantityGiven = 0;

        // save the item and check for errors
        item.save(function(err) {
            if(err) {
                res.send(err);
            }

            res.json(item);
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
            if(!checkItemRequestData(req)) {
                res.status(400).send("Name or quantityInStock not found.");
            }

            if(!req.params.item_id) {
                res.status(400).send("Item ID is empty.");
            }

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