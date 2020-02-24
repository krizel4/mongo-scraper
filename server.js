// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// scraping dependencies
const axios = require('axios');
const cheerio = require('cheerio');


// port
const PORT = process.env.PORT || 3000;

// express app
const app = express();

// router
const router = express.Router();

// routes
require('./config/routes')(router);

// static directory
app.use(express.static(__dirname + '/public'));

// handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// router middleware
// app.use(router);
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// // mongodb when deployed
const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log(`Connected to ${db}`))
    .catch((err) => console.error(err));

// listen
app.listen(PORT, function () {
    console.log('Listening on http://localhost:' + PORT);
});