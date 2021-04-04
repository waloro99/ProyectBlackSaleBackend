//const { pseudoRandomBytes } = require("node:crypto");

// JSON data
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

const express = require('express');
const { pseudoRandomBytes } = require('node:crypto');
const product = require('../models/product');
const router = express.Router()
const Product = require('../models/product')

// Router
const router = app => {

    //create
    app.post('/api/v1/products', async(req, res) => {
        if(!req.body.name) {
            respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Todos los campos son requeridos'
            };
        } else {
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
            respuesta = {
                error: false,
                codigo: 201,
                mensaje: 'Producto creado',
                respuesta: product
            };
            const p1 = await product.save()
        }
    res.send(respuesta);
    })  

    //read
    app.get('/api/v1/products', async(req, res) => {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
            };
            if(producto === '') {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El producto no ha sido creado'
            };
            } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'respuesta del producto',               
            };
            const products = await Product.find()
            }
            res.send(respuesta);
    })

    app.get('/api/v1/products/:id', async(req, res) => {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
            };
            if(producto === '') {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El producto no ha sido creado'
            };
            } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'respuesta del producto',               
            };
            const products = await Product.findById(req.params.id)
            }
            res.send(respuesta);
    })

    //update
    app.put('/api/v1/products/:id', (req, res) => {
        if(!req.body.name) {
            respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Todos los campos son requeridos'
        };
        } else {
            if(producto.name === '') {
                respuesta = {
                error: true,
                codigo: 404,
                mensaje: 'El producto no ha sido creado'
                };
            } else {
                const product = await Character.findById(req.params.id)
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
                respuesta = {
                error: false,
                codigo: 204,
                mensaje: 'Producto actualizado'
                };
                const p1 = await product.save()
            }
        }
    res.send(respuesta);
    })

    //delete
    app.delete('/api/v1/products/:id', async(req, res) => {
        if(producto.name === '') {
            respuesta = {
            error: true,
            codigo: 404,
            mensaje: 'El producto no ha sido creado'
            };
        } else {
            respuesta = {
            error: false,
            codigo: 204,
            mensaje: 'Producto eliminado'
            };
            const product = await Product.findByIdAndRemove(req.params.id)
            const p1 = await product.remove()
        }
    res.send(respuesta);
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