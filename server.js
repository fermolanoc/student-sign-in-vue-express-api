let express = require("express");

let app = express();

let server = app.listen(process.env.PORT || 3000, function () {
  console.log("Express server running on port", server.address().port);
});
