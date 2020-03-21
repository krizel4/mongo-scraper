// dependencies
const express = require('express');
const logger = require('morgan');
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
app.use(logger('dev'));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// make public a static folder
app.use(express.static('public'));

// handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// mongodb when deployed
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoScrapes';
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log(`Connected to ${MONGODB_URI}`))
  .catch(err => console.error(err));

// Routes
// landing page
app.get('/', (req, res) => {
  db.Headline.find({
    saved: false
  })
    .lean()
    .then(function(dbHeadline) {
      const hbsObject = {
        data: dbHeadline
      };
      res.render('index', hbsObject);
    }).catch,
    err => {
      res.json(err);
    };
});

// Route for getting all headlines from the db
app.get('/headlines', (req, res) => {
  db.Headline.find({}).then(function(dbHeadline) {
    console.log(dbHeadline);
    res.json(dbHeadline);
  }).catch,
    err => {
      res.json(err);
    };
});

// route for saved headlines
app.get('/save', (req, res) => {
  db.Headline.find({
    saved: true
  })
    .lean()
    .then(function(dbHeadline) {
      var hbsObject = {
        data: dbHeadline
      };
      res.render('save', hbsObject);
    });
});

// route to change saved from false to true
app.put('/save/:id', (req, res) => {
  db.Headline.updateOne(
    { _id: req.params.id },
    { saved: true }
  ).then(function(response) {
    res.json(response);
  });
});

// route to change from saved to unsave
app.put('/unsave/:id', (req, res) => {
  db.Headline.updateOne(
    { _id: req.params.id },
    { saved: false }
  ).then(function(response) {
    res.json(response);
  });
});

// Route for grabbing a specific Headline by id, populate it with its note
app.get('/headlines/:id', (req, res) => {
  db.Headline.findOne({
    _id: req.params.id
  })
    .populate('note')
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    }).catch,
    err => {
      res.json(err);
    };
});

// create a note
app.post('/headlines/:id', (req, res) => {
  db.Note.create(req.body).then(function(dbNote) {
    return db.Headline.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { notes: dbNote._id } },
      { new: true }
    );
  }).then(function(dbHeadline){
    res.json(dbHeadline);
  })
});

// Route for saving/updating an Headline's associated Note
app.post('/headlines/:id', (req, res) => {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Headline.findOneAndUpdate
      ({_id: req.params.id},
        {note: dbNote._id},
        {new: true});
    })
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    }).catch,
    err => {
      res.json(err);
    };
});

// A GET route for scraping the WSJ website
app.get('/scrape', (req, res) => {
  axios.get('http://www.wsj.com/').then(function(response) {
    const $ = cheerio.load(response.data);
    const result = {};
    // grab every 3 within an Headline tag, and do the following:
    $('headline').each(function(i, element) {
      console.log(result);
      result.title = $(element)
        .find('.WSJTheme--headline--19_2KfxG')
        .children()
        .first()
        .text();
      result.link = $(element)
        .find('a')
        .attr('href');
      result.summary = $(element)
        .find('.WSJTheme--summary--12br5Svc')
        .children()
        .remove()
        .end()
        .text();

      // Create a new Headline using the `result` object built from scraping
      if (result.title && result.link && result.summary) {
        db.Headline.create(result).then(function(dbHeadline) {
          console.log(dbHeadline);
        }).catch,
          err => {
            console.log(err);
          };
      }
    });
    res.send('Scrape Complete');
  });
});

// listen
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
});
