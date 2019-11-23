const randomMove = require("./ai.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// serves the static react files
app.use(express.static("build"));

// routes

app.get('/', (req, res) => {
  console.log('Home route');
  res.send('Hello world\n');
});

app.get("/move", (req, res) => {
  console.log(req.body);
  res.status(200);
  res.send(randomMove(req.body));
});

app.listen(port, function () {
  console.log(`App listening on ${port}!`);
});