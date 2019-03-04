var db = require("../models");

module.exports = function (app) {
   //Route for getting all Articles from the db
  app.get("/", function(req, res){
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

  //Route to get specific article by id and populate
  //its 'note' field.
  app.get("/articles/:id", function(req,res){
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(dbArticle){
        res.json(dbArticle);
      })
      .catch(function(err){
        res.json(err);
      });
  });
}
