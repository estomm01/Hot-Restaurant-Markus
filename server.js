var express = require ('express');
var path = require ('path');
var bodyParser = require ('body-parser');
// Sets up the Express App

var app = express ();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use (express.urlencoded ({extended: true}));
app.use (express.json ());

app.listen (PORT, function () {
  console.log ('App listening on PORT ' + PORT);
});

var customers = [];
var waitlist = [];

app.get ('/reserve', function (req, res) {
  res.sendFile (path.join (__dirname, 'reserve.html'));
});

app.get ('/', function (req, res) {
  res.sendFile (path.join (__dirname, 'home.html'));
});

app.get('/api/tables', function (req, res) {
  for (var i = 5; i < customers.length; i++) {
    res.json(customers[i]);

  }
  return res.json (customers);
});

app.get ('/api/waitlist', function (req, res) {
  for (var i = 0; i < customers.length; i++) {
    res.json (customers[i]);
  }
  return res.json (waitlist);
});

app.post ('/api/clear', function (req, res) {
  customers = [];
  waitlist = [];
});

app.post ('/api/new', function (req, res) {
  console.log ('Works');
  var newCustomer = req.body;
  if (customers.length >= 5) {
    waitlist.push (newCustomer);
  } else {
    customers.push (newCustomer);
  }
  res.json (newCustomer);
});

// // $(document).ready(function () {
// //   $ ('#reservation').on ('click', function () {
// //     res.sendFile (path.join (__dirname, 'reserve.html'));
// //   });
// });
