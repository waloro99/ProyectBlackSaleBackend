//const { pseudoRandomBytes } = require("node:crypto");

// JSON data
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

const express = require('express');
//const { pseudoRandomBytes } = require('node:crypto');
const product = require('../models/product');
//const router = express.Router()
const Product = require('../models/product')

// Router
const router = app => {

    //create
    app.post('/api/v1/products', async(req, res) => {
        const product = new Product
        ({
                id: req.body.id,
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                photo: req.body.photo,
                stocks: req.body.stocks,
                description: req.body.description
        })
        try{
            const p1 = await product.save()
            //res.json(p1)
            res.sendStatus(201)
        }catch(err){
            res.status(404).send('Error')
        }
    })  

    //read
    app.get('/api/v1/products', async(req, res) => {
        try{
            const products = await Product.find()
            res.status(200).json(products)
        }catch(err){
            res.status(404).send('Error ' + err)
        }
            
    })

    app.get('/api/v1/products/:id', async(req, res) => {
        try{
            const products = await Product.findById(req.params.id)
            res.status(200).json(products)
        }catch(err){
            res.status(404).send('Error ' + err)
        }       
    })

    //update
    app.put('/api/v1/products/:id', async(req, res) => {
        try{
            const product = await Product.findById(req.params.id)
                if(req.body.id){
                    product.id = req.body.id
                }
                if(req.body.name){
                    product.name = req.body.name
                }
                if(req.body.category){
                    product.category = req.body.category
                }
                if(req.body.price){
                    product.price = req.body.price
                }
                if(req.body.photo){
                    product.photo = req.body.photo
                }
                if(req.body.stocks){
                    product.stocks = req.body.stocks
                }
                if(req.body.description){
                    product.description = req.body.description
                }
                const p1 = await product.save()
                //res.json(p1)
                res.sendStatus(204)
            }catch(err){
                res.status(404).send('Error')
            }
    })

    //delete
    app.delete('/api/v1/products/:id', async(req, res) => {
        try{
            const product = await Product.findByIdAndRemove(req.params.id)
            const p1 = await product.remove()
            //res.json(p1)
            res.sendStatus(204)
        }catch(err){
            res.status(404).send('Error')
        }
    })

    app.use(function(req, res, next) {
        respuesta = {
        error: true, 
        codigo: 404, 
        mensaje: 'URL no encontrada'
        };
        res.status(404).send(respuesta);
    });

}
// Export the router
module.exports = router;