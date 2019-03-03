var db = require("../models");
// const mongoose = require("mongoose");

module.exports = function (app) {
   //Route for getting all Articles from the db
  app.get("/articles", function(req, res){
    db.Article.find({})
    .then(function(dbArticles){
        const dbObject = {
          objects: dbArticles
        }
        
        console.log("logging dbArticles in articleRoutes.js");
        console.log(dbObject);
        res.render("index", dbObject);
    })
    .catch(function(err){
        res.json(err);
    });
  });
}
