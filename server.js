// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require ('cheerio');

// models
const db = require('./models');

// port
const PORT = process.env.PORT || 3000;

// express app
var app = express();

// router
const router = express.Router();

// static directory
app.use(express.static(__dirname + '/public'));

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main', }),
);

// router middleware
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// listen
app.listen(PORT, function() {
    console.log('Listening on http://localhost:' + PORT);
});