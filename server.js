let express = require("express");
let api_routes = require("./routes/api");
let path = require("path");

// Create web app
let app = express();

let vueClientPath = path.join(__dirname, "student-sign-in-client", "dist");
app.use(express.static(vueClientPath));

// prepare app to be able to handle json data that's coming into the body of the request
app.use(express.json());

// define route to receive and respond to the routes functions
app.use("/api", api_routes);

// handle requests not showing a result
app.use(function (req, res, next) {
  // show 404 error message for request not resolved
  res.status(404).send("Not found");
});

// handle server errors message
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Server error");
});

// start server on Heroku port or 3000 locally
let server = app.listen(process.env.PORT || 3000, function () {
  console.log("Express server running on port", server.address().port);
});
