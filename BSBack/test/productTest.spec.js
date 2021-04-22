process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Product = require('../models/product');
const assert = require('chai').assert;
const expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./rutas/routes');
let should = chai.should();
const axios = require('axios');
chai.use(chaiHttp);

//Our parent block
describe('Products', () => {
	beforeEach((done) => { //Before each test we empty the database
		Product.remove({}, (err) => { 
		done();		   
		});		
	});
/*
  * Test the /POST route
*/
    describe('/POST product', () => {
        it('it should not POST a product without stocks field', (done) => {
            let product = {
                id: 1,
                name: "globos",
                category: "Temporada",
                price: "Q10.00",
                photo: "/photo1.png",
                stocks: 4,
                description: "globos abc"
                }
                chai.request(server)
                .post('/api/v1/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('stocks');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                done();
                });
        });
        it('it should POST a product ', (done) => {
            let product = {
                id: 1,
                name: "globos",
                category: "Temporada",
                price: "Q10.00",
                photo: "/photo1.png",
                stocks: 4,
                description: "globos abc"
            }
                chai.request(server)
                .post('/api/v1/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Product successfully added!');
                    res.body.book.should.have.property('title');
                    res.body.book.should.have.property('author');
                    res.body.book.should.have.property('pages');
                    res.body.book.should.have.property('year');
                done();
                });
        });
    });

    /*
    * Test the /GET 
    */
    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
            .get('/api/v1/products')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    /*
    * Test the /GET/:id 
    */
    describe('/GET/:id product', () => {
        it('it should GET a product by the given id', (done) => {
            let product = new Product({id: 1, name: "globos", category: "Temporada", price: "Q10.00", photo: "/photo1.png", stocks: 4, description: "globos abc"});
            product.save((err, product) => {
                chai.request(server)
                .get('/api/v1/products/' + product.id)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('pages');
                    res.body.should.have.property('year');
                    res.body.should.have.property('_id').eql(product.id);
                done();
                });
            });        
        });
    });

    /*
    * Test the /PUT/:id 
    */
    describe('/PUT/:id product', () => {
        it('it should UPDATE a product given the id', (done) => {
            let product = new Product({id: 1, name: "globos", category: "Temporada", price: "Q10.00", photo: "/photo1.png", stocks: 4, description: "globos abc"})
            product.save((err, product) => {
                    chai.request(server)
                    .put('/api/v1/products/' + product.id)
                    .send({id: 1, name: "globos", category: "Temporada", price: "Q10.00", photo: "/photo1.png", stocks: 5, description: "globos abc"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Product updated!');
                        res.body.book.should.have.property('stocks').eql(5);
                    done();
                    });
            });
        });
    });

    /*
    * Test the /DELETE/:id 
    */
    describe('/DELETE/:id product', () => {
        it('it should DELETE a product given the id', (done) => {
            let product = new Product({id: 1, name: "globos", category: "Temporada", price: "Q10.00", photo: "/photo1.png", stocks: 4, description: "globos abc"})
            product.save((err, product) => {
                    chai.request(server)
                    .delete('/api/v1/products/' + product.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Product successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                    done();
                    });
            });
        });
    });
});