var express = require("express");
var router = express.Router();
var helpers = require("../helpers/helper");
var createError = require("http-errors");

/* GET home page. */
router.get("/", function(req, res, next) {
  var data = {
    status: 200,
    description: "Everything is working fine",
    data: null
  };
  res.type("json");
  res.send(data);
});
router.get("/convert", function(req, res) {
  res.status(404);
  res.send({ error: "Not Allowed" });
  createError(404);
});
router.post("/convert", async function(req, res, next) {
  var [reqFlag, data] = helpers.saveRequest(req);
  //Request from RapidAPI
  if (reqFlag) {
    var id = req.headers["x-request-id"].replace("-", "_");
    var html = decodeURIComponent(req.body.html.replace(/\+/g, " "));
    var css = req.body.css
      ? decodeURIComponent(req.body.css.replace(/\+/g, " "))
      : "";

    var contents = "<div>" + html + "<div>" + "<style>" + css + "</style>";
    //save image to billimages directory
    await helpers.saveScreenshot(id, contents);
    // get base64 encoded png data
    var imageData = await helpers.getPNGData(id);
    //delete the png from disk to save memory and maintain user privacy
    await helpers.deleteImage(id);

    data["imageData"] = imageData;
  }
  res.type("json");
  res.send(data);
});
module.exports = router;
