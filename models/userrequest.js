var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userrequestSchema = new Schema({
  user: String,
  ip: String,
  request_id: String,
  rapidapi_subscription: String
});

module.exports = mongoose.model("UserRequest", userrequestSchema);
