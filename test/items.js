var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

describe('Item', function() {
    var url = 'localhost:8080/api/';
    var savedItemID = '';
    var testChangingFile = '';

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
                
                console.log("RES IS:" + res);
                res.status.should.be.equal(200);
                assert.equal(typeof res.body, 'object');
                done();
            });
        });

        it('should be able to save an item', function(done) {
            var item = {
                name: "testItem",
                quantityInStock: 1500
            };

            request(url)
            .post('items')
            .send(item)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                
                res.status.should.be.equal(200);
                assert(res.body._id);
                savedItemID = res.body._id;
                done();
            });
        });

        it('should NOT save an item with no name nor QiS', function(done) {
            var item = {};

            request(url)
            .post('items')
            .send(item)
            .end(function(err, res) {
                res.status.should.be.equal(400);
                done();
            });
        });
    });

    describe('ItemChange', function() {
        it('should be able to retreive an item by its id', function(done) {
            request(url)
            .get('items/' + savedItemID)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                
                res.status.should.be.equal(200);
                assert(res.body._id);
                done();
            });
        });

        it('should be able to update an item given its id', function(done) {
            var item = {
                name: "New Name",
                quantityInStock: 1000
            };

            request(url)
            .put('items/' + savedItemID)
            .send(item)
            .end(function(err, res) {
                res.body.message.should.be.equal('Item updated!');
                done();
            });
        });

        it('should be able to delete an item given its id', function(done) {

            request(url)
            .delete('items/' + savedItemID)
            .end(function(err, res) {
                res.body.message.should.be.equal('Successfully deleted.');
                done();
            });
        });
    });
});