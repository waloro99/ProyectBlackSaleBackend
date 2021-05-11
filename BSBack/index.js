const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://walter:papucho10@clusterbackend.ebsei.mongodb.net/BlackSale?retryWrites=true&w=majority'
//const url = 'mongodb://mongo:27017/ProductDBbs'
//const url = 'mongodb://localhost/ProductDBbs'
var app = express();
//const request =  require('request');
//const async = require('async');
const bodyParser = require('body-parser');
const routes = require('./rutas/routes');
const router = express.Router()//-
var cors = require('cors');
app.use(cors());

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...') 
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

routes(app);

app.listen('8010', () =>{
    console.log('Listening on port 8010');
})