var db = require("../models");

module.exports = function (app) {
    //Route to add note to notemodel
    //with corresponding article id
    app.post("/articles/:id", function(req, res){
        //Create new note in Notedb
        db.Comments.create(req.body)
        .then(function(dbComment){
            //Find corresponding article and update it to be associated with the new Note.
            return db.Article.findOneAndUpdate({_id:req.params.id}, { comment: dbComment._id}, {new:true});
        })
        .then(function(dbArticle){
            //If article successfully updated, send back to client.
            res.json(dbArticle);
        })
        .catch(function(err){
            //If error, log error
            res.json(err);
        });
    });
}