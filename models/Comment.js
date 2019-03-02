const mongoose = require("mongoose");

//Save reference to Schema constructor
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    title: String,

    body: String
});

//Create model from above schema
const Comment = mongoose.model("Comment", CommentSchema);

//Export the Comment model
module.exports = Comment;