var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

describe('Item', function() {
    var url = 'localhost:8080/api/';
    var savedItemID = '';

    before(function(done) {
        mongoose.connect('mongodb://localhost:27017/inven-manage-test');
        done();
    });

    after(function(done) {
        mongoose.connection.db.dropDatabase;
        done();
    });

    describe('Items', function() {
        it('should be able to list items', function(done) {
            request(url)
            .get('items')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                
                res.should.have.status(200);
                assert.equal(typeof res, 'object');
                done();
            });
        });

        it('should be able to save an item', function(done) {
            var item = {
                name: testItem,
                quantityInStock: 1500
            };

            request(url)
            .post('items')
            .send(item)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                
                res.should.have.status(200);
                assert(res._id);
                done();
            });
        });

        it('should NOT save an item with no name nor QiS', function(done) {
            var item = {};

            request(url)
            .post('items')
            .send(item)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('ItemChange', function() {
        //TODO: Write tests for getting an item by ID, updating an item, 
        // and deleting an item.
    });
});