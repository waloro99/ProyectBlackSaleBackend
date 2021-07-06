const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://walter:papucho10@clusterbackend.ebsei.mongodb.net/BlackSale?retryWrites=true&w=majority'
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

const app = express();
const  PORT = 3306;
app.use(cors());
app.use(express.json())





//var app = express();

const bodyParser = require('body-parser');
const routes = require('./rutas/routes');
const router = express.Router()//-
//var cors = require('cors');
//app.use(cors());

//mongoose.connect(url, {useNewUrlParser:true})
//const con = mongoose.connection

db.on('open', () => {
    console.log('connected...') 
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

routes(app);

app.listen('3306', () =>{
    console.log('Listening on port 3306');
})