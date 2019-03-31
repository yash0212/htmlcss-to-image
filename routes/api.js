var express = require("express");
var router = express.Router();
var helpers = require("../helpers/helper");

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
router.get("/convert", async function(req, res, next) {
  var id = 2;
  var contents = `<!DOCTYPE html><html> <head> <title>Bill</title> <style>table{width: 100%;}div{width: 400px;}.r{text-align: right;}h5, h4, h2{text-align: center;}</style> </head> <body> <div id="bill"> <h2>Vs Foods</h2> <h5>Near Dulhan Banquet</h5> <h5>Modi Nagar-201204</h5> <h5>Uttar Pradesh</h5> <h5>01232-222444, 232000</h5> <h5>GSTIN No : 09AANFV5729N127</h5> <h4><strong>Invoice cum Challan</strong></h4> <hr style="border-top: dashed 1px;"> <table> <tr> <td>Itemo# Fd/19/36327</td><td class="r">01:36 PM 28-Mar-2019</td></tr><tr> <td>User: Cashier Food Court</td><td class="r">Pax# 1</td></tr></table> <h2><strong>Table# 23</strong></h2> <hr style="border-top: dashed 1px;"> <table> <tr> <th class="r" >Sr</th> <th>Product</th> <th class="r" >Qty</th> <th class="r" >Rate</th> <th class="r" >Amount</th> </tr><tr> <td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td></tr><tr> <td class="r">1</td><td>004N00000000 Fresh Lime Soda</td><td class="r">2</td><td class="r">30.00</td><td class="r">60.00</td></tr><tr> <td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td><td><hr style="border-top: dashed 1px;"></td></tr></table> <table> <tr> <td>MRP Total:</td><td class="r">60.00</td></tr><tr> <td>Sub Total:</td><td class="r">60.00</td></tr><tr> <td><strong>Total Qty: 2 Amt:</strong></td><td class="r"><h2>60.00</h2></td></tr></table> <h5>(Rupees Sixty Only)</h5> <hr style="border-top: dashed 1px;"> <h5>We are in computing scheme hence we are not charging gst</h5> </div></body> </html>`;
  //save image to billimages directory
  await helpers.saveScreenshot(id, contents);
  // get base64 encoded png data
  var dat = await helpers.getPNGData(id);
  //delete the png from disk to save memory and maintain user privacy
  await helpers.deleteImage(id);
  // dat = `<img src="data:image/png;base64, ${dat}">`;
  res.type("html");
  res.send(dat);
});
module.exports = router;
