// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// scraping dependencies
const axios = require('axios');
const cheerio = require('cheerio');

// require all models
const db = require('./models');

// port
const PORT = process.env.PORT || 3000;

// initialize express
const app = express();

// Configure middleware
// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public a static folder
app.use(express.static('public'));

// handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// mongodb when deployed
const mDB = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(mDB, {
        useNewUrlParser: true
    })
    .then(() => console.log(`Connected to ${mDB}`))
    .catch((err) => console.error(err));

// Routes
// A GET route for scraping the WSJ website
app.get('/scrape', function(req, res, body) {
    // First, we grab the body of the html with axios
    axios.get('http://www.wsj.com/').then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every 3 within an Headline tag, and do the following:
      $('article').each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element).find('.WSJTheme--headline--19_2KfxG')
          .children('a')
          .text();
        result.link = $(element).find('.WSJTheme--summary--12br5Svc')
          .children('a')
          .attr('href');

        // Create a new Headline using the `result` object built from scraping
        db.Headline.create(result)
          .then(function(dbHeadline) {
            // View the added result in the console
            console.log(dbHeadline);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send('Scrape Complete');
    });
  });

  // Route for getting all headlines from the db
  app.get('/headlines', function(req, res) {
    // Grab every document in the headlines collection
    db.Headline.find({})
      .then(function(dbHeadline) {
        // If we were able to successfully find headlines, send them back to the client
        console.log(dbHeadline);
        res.json(dbHeadline);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for grabbing a specific Headline by id, populate it with it's note
  app.get('/headlines/:id', function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Headline.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate('note')
      .then(function(dbHeadline) {
        // If we were able to successfully find an Headline with the given id, send it back to the client
        res.json(dbHeadline);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving/updating an Headline's associated Note
  app.post('/headlines/:id', function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Headline with an `_id` equal to `req.params.id`. Update the Headline to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbHeadline) {
        // If we were able to successfully update an Headline, send it back to the client
        res.json(dbHeadline);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

// listen
app.listen(PORT, function () {
    console.log('Listening on http://localhost:' + PORT);
});