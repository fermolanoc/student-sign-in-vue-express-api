let express = require("express");
let api_routes = require("./routes/api");

// Create web app
let app = express();

// prepare app to be able to handle json data that's coming into the body of the request
app.use(express.json());

// define route to receive and respond to the routes functions
app.use("/api", api_routes);

// start server on Heroku port or 3000 locally
let server = app.listen(process.env.PORT || 3000, function () {
  console.log("Express server running on port", server.address().port);
});
