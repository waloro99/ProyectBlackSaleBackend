//const { pseudoRandomBytes } = require("node:crypto");

// JSON data
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// Router
const router = app => {

    //create
    app.post('/api/v1/products', (req, res) => {
        if(!req.body.name) {
            respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Todos los campos son requeridos'
            };
        } else {
                producto = {
                    id: req.body.id,
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                    photo: req.body.photo,
                    stocks: req.body.stocks,
                    description: req.body.description
                };
                respuesta = {
                error: false,
                codigo: 201,
                mensaje: 'Producto creado',
                respuesta: producto
                };
        }
    res.send(respuesta);
    })  

    //read
    app.get('/api/v1/products', (req, res) => {
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
                respuesta: producto
            };
            }
            res.send(respuesta);
    })

    //update
    app.put('/api/v1/products', (req, res) => {
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
                producto = {
                    id: req.body.id,
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                    photo: req.body.photo,
                    stocks: req.body.stocks,
                    description: req.body.description
                };
                respuesta = {
                error: false,
                codigo: 204,
                mensaje: 'Producto actualizado',
                respuesta: producto
                };
            }
        }
    res.send(respuesta);
    })

    //delete
    app.delete('/api/v1/products', (req, res) => {
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
            producto = {
                id: '',
                name: '',
                category: '',
                price: '',
                photo: '',
                stocks: '',
                description: ''
            };
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