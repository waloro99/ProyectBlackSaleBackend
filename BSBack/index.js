const express = require('express');
const app = express();
const request =  require('request');
const async = require('async');

app.post('/create', (request, response) => {
    response.json({'itworks': 'yes'});
})

app.get('/read', (request, response) => {
    response.json({'itworks': 'yes'});
})

app.put('/update', (request, response) => {
    response.json({'itworks': 'yes'});
})

app.delete('/delete', (request, response) => {
    response.json({'itworks': 'yes'});
})

app.listen('8010', () =>{
    console.log('Listening on port 8010');
})