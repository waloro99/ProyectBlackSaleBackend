const express = require('express');
const app = express();
const request =  require('request');
const async = require('async');

app.get('/upcoming', (request, response) => {
    response.json({'itworks': 'yes'});
})

app.listen('8010', () =>{
    console.log('Listening on port 8010');
})