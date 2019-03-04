const mongoose = require("mongoose");

//Save reference to Schema constructor
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    username: String,
    title: String,
    body: String
});

//Create model from above schema
const Comments = mongoose.model("Comments", CommentSchema);

//Export the Comments model
module.exports = Comments;