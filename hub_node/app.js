/**
 * /app.js
 * App entry point
 */

// Requirements
var express = require('express');

// Modules
var modUpload = require("./modules/upload/upload");

// Initialisations
var app = express();

// settings
var port = 4121 // D: 4; A: 1; T: 20; A: 1

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Routes
app.use("/new", modUpload.router);


app.get("*", function(req, res) {
	res.end("Data Awesome");
});


// Run App
app.listen(port, function() {
	console.log("Server Running at 127.0.0.1:%s", port);
});
