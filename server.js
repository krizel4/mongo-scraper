// dependencies
const express = require("express");

// port
const PORT = process.env.PORT || 3000;

// express app
var app = express();

// router
const router = express.router();

// static directory
app.use(express.static(__dirname + "/public"));

// router middleware
app.use(router);

// listen
app.listen(PORT, function() {
    console.log("Listening on http://localhost:" + PORT);
});