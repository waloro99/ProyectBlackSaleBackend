var cors = require('cors');

// MYSQL
const mysql = require('mysql')
const db = mysql.createConnection({
host: "rds-mysql-blacksale.cwsoxzkefv5g.us-east-1.rds.amazonaws.com",
user: "admin",
password: "blacksale123",
database:"db_blacksale" 
})

module.exports = db;



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
//const clearCache = require('../services/cache')
/*var redis = require('redis');
var client = redis.createClient();

client.on('ready',function(){
    console.log("Redis is ready")
})*/
/*var redisClient = require('redis').createClient;
var redis = redisClient(6379, '0.0.0.0');*/

/*const redisClient = require('redis')
const redis = redisClient.createClient(6379,'process.env.REDIS_HOST')*/

// Router
const router = app => {

    //*************  PRODUCTS TABLE  *******************/

    //create
    app.post('/api/v1/products', async(req, res) => {
        const name = req.body.name;
        const category = req.body.category;
        const price = req.body.price;
        const photo = req.body.photo;
        const stocks = req.body.stocks;
        const description = req.body.description;
        
        db.query("INSERT INTO Productos (name, category, price, photo, stocks, description) VALUES (?,?,?,?,?,?)",[name,category,price,photo,stocks,description], (err,result)=>{
            if(err) {
                console.log(err)
                res.sendStatus(404)
            } else {
                console.log(result)
                res.sendStatus(201)
            }
        });
    })  

    //read
    app.get('/api/v1/products', async(req, res) => {
        db.query("SELECT * FROM Productos", (err,result)=>{
            if(err) {
                console.log(err)
                res.sendStatus(404)
            } else {
                res.status(200).json(result)
            }
        
        });
            
    })

    app.get('/api/v1/products/:id', async(req, res) => {
        const id = req.params.id;
         db.query("SELECT * FROM Productos WHERE _id = ?", id, 
            (err,result)=>{
                if(err) {
                    console.log(err)
                    result.sendStatus(404)
                } else {
                    res.status(200).send(result)
                }
            });   
    })

    //update
    app.put('/api/v1/products/:id', async(req, res) => {

        const id = req.params.id;
        const name = req.body.name;
        const category = req.body.category;
        const price = req.body.price;
        const photo = req.body.photo;
        const stocks = req.body.stocks;
        const description = req.body.description;
        
        db.query("UPDATE Productos SET name = ?, category = ?, price = ?, photo = ?, stocks = ?, description = ? WHERE _id = ?",[name,category,price,photo,stocks,description,id], 
        (err,result)=>{
            if(err) {
                console.log(err)
                result.sendStatus(404)
            } else {
                console.log(result)
                res.sendStatus(204)
            }
        });
    })

    //delete
    app.delete('/api/v1/products/:id', async(req, res) => {
        const id = req.params.id;
        
        db.query("DELETE FROM Productos WHERE _id = ?", id, (err,result)=>{
            if(err) {
                console.log(err)
                result.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        }) 
    })


    //*************  USERS TABLE  *******************/

    //create
    app.post('/api/v1/users', async(req, res) => {
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const role = req.body.role;
        const enabled = req.body.enabled;
        const permissionCreate = req.body.permissionCreate;
        const permissionEdit = req.body.permissionEdit;
        const permissionDelete = req.body.permissionDelete;
        
        db.query("INSERT INTO Usuarios (name, lastname, email, role, enabled, permissionCreate, permissionEdit, permissionDelete) VALUES (?,?,?,?,?,?,?,?)",[name,lastname,email,role,enabled,permissionCreate,permissionEdit,permissionDelete], (err,result)=>{
            if(err) {
                console.log(err)
                res.sendStatus(404)
            } else {
                console.log(result)
                res.sendStatus(201)
            }
        });
    })  

    //read
    app.get('/api/v1/users', async(req, res) => {
        db.query("SELECT * FROM Usuarios", (err,result)=>{
            if(err) {
                console.log(err)
                res.sendStatus(404)
            } else {
                res.status(200).send(result)
            }
        
        });
            
    })
/*
    app.get('/api/v1/users/:id', async(req, res) => {
        const id = req.params.id;
         db.query("SELECT * FROM Usuarios WHERE _id = ?", id, 
            (err,result)=>{
                if(err) {
                    console.log(err)
                    result.sendStatus(404)
                } else {
                    res.status(200).send(result)
                }
            });   
    })*/

    //obtener verififacion cuenta habilitada
    app.get('/api/v1/users/:email', async(req, res) => {
        const email = req.params.email;
         db.query("SELECT * FROM Usuarios WHERE email = ? ", email, 
            (err,result)=>{
                if(err) {
                    console.log(err)
                    result.sendStatus(404)
                } else {
                    res.status(200).send(result)
                }
            });   
    })

    //update
    app.put('/api/v1/users/:id', async(req, res) => {

        const id = req.params.id;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const role = req.body.role;
        const enabled = req.body.enabled;
        const permissionCreate = req.body.permissionCreate;
        const permissionEdit = req.body.permissionEdit;
        const permissionDelete = req.body.permissionDelete;
        
        db.query("UPDATE Usuarios SET name = ?, lastname = ?, email = ?, role = ?, enabled = ?, permissionCreate = ?, permissionEdit = ?, permissionDelete = ? WHERE _id = ?",[name,lastname,email,role,enabled,permissionCreate,permissionEdit,permissionDelete,id], 
        (err,result)=>{
            if(err) {
                console.log(err)
                result.sendStatus(404)
            } else {
                console.log(result)
                res.sendStatus(204)
            }
        });
    })

    //delete
    app.delete('/api/v1/users/:id', async(req, res) => {
        const id = req.params.id;
        
        db.query("DELETE FROM Usuarios WHERE _id = ?", id, (err,result)=>{
            if(err) {
                console.log(err)
                result.sendStatus(404)
            } else {
                res.sendStatus(204)
            }
        }) 
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