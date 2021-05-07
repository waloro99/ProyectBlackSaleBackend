//process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Product = require('../models/product');
const products = require('../rutas/routes')
const assert = require('chai').assert;
const expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../rutas/routes');
var should = require('chai').should();
const axios = require('axios');
let app = require('../index');
chai.use(chaiHttp);

//Our parent block
/*describe('Products', () => {
	beforeEach((done) => { //Before each test we empty the database
		Product.remove({}, (err) => { 
		done();		   
		});		
	});
*/

    /*
    * Test the /GET 
    */
    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request('http://localhost:8010/')
            .get('/api/v1/products')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //res.body.length.should.be.eql(0);
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
                chai.request('http://localhost:8010/')
                .get('/api/v1/products/' + product.id)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('category');
                    res.body.should.have.property('price');
                    res.body.should.have.property('photo');
                    res.body.should.have.property('stocks');
                    res.body.should.have.property('description');
                    res.body.should.have.property('_id').eql(product.id);
                done();
                });
            });        
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
                chai.request('http://localhost:8010/')
                .post('/api/v1/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(404);
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
                chai.request('http://localhost:8010/')
                .post('/api/v1/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(201);
                done();
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
                    chai.request('http://localhost:8010/')
                    .put('/api/v1/products/' + product.id)
                    .send({id: 1, name: "globos", category: "Temporada", price: "Q10.00", photo: "/photo1.png", stocks: 5, description: "globos abc"})
                    .end((err, res) => {
                        res.should.have.status(204);
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
                    chai.request('http://localhost:8010/')
                    .delete('/api/v1/products/' + product.id)
                    .end((err, res) => {
                        res.should.have.status(204);
                    done();
                    });
            });
        });
    });
//});