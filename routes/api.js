var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  var data = {
    status: 200,
    description: "everything is correct",
    data: null
  };
  res.type("json");
  res.send(data);
});

module.exports = router;
