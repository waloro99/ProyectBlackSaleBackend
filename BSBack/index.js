const express = require('express');
const app = express();
//const request =  require('request');
//const async = require('async');
const bodyParser = require('body-parser');
const routes = require('./rutas/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

routes(app);

app.listen('8010', () =>{
    console.log('Listening on port 8010');
})