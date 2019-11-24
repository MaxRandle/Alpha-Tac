const randomMove = require("./ai.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.post("/move", (req, res) => {
  console.log("move");
  res.status(200);
  const move = randomMove(req.body);
  res.send(move);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
