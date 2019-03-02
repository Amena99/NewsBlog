var db = require("../models");

module.exports = function (app) {
    app.get("/articles", function (req, res) {
      res.render("index");
    });
}