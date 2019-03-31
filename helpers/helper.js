var userRequest = require("../models/userrequest.js");
const puppeteer = require("puppeteer");
var fs = require("fs");

exports.saveRequest = function(req) {
  var headers = req.headers;

  if (
    headers.hasOwnProperty("x-rapidapi-proxy-secret") &&
    headers["x-rapidapi-proxy-secret"] == process.env.X_RAPIDAPI_PROXY_SECRET
  ) {
    var request = new userRequest({
      user: headers["x-rapidapi-user"],
      ip: headers["x-real-ip"] || req.connection.remoteAddress,
      request_id: headers["x-request-id"],
      x_rapidapi_subscription: headers["rapidapi-subscription"]
    });
    request.save();
    var data = {
      headers: headers
    };
    return [1, data];
  } else {
    var request = new userRequest({
      user: "Unauthenticated",
      ip: headers["x-real-ip"] || req.connection.remoteAddress,
      request_id: null,
      x_rapidapi_subscription: null
    });
    request.save();
    var data = {
      error: "Unauthenticated Request"
    };
    return [0, data];
  }
};

exports.saveScreenshot = async function(id, contents) {
  let browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  let page = await browser.newPage();

  await page.setContent(contents);
  await page.setViewport({ width: 4000, height: 4000 });

  async function screenshotDOMElement(selector, padding = 0) {
    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    return await page.screenshot({
      path: "./images/image_" + id + ".png",
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      },
      type: "png"
    });
  }

  await screenshotDOMElement("div", 10);

  await page.close();
  await browser.close();
};

exports.getPNGData = async function(id) {
  var imgData = fs.readFileSync("./images/image_" + id + ".png");
  var base64Data = new Buffer.from(imgData, "binary").toString("base64");
  return base64Data;
};

exports.deleteImage = async function(id) {
  fs.unlinkSync("./images/image_" + id + ".png");
};
