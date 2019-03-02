const mongoose = require("mongoose");

//Reference Schema constructor 
//? "Schema" is in the mongoose package
const Schema = mongoose.Schema;

//Use Schema constructor to make new UserSchema object

const ArticleSchema = new Schema ({
    //title of the article
    title: {
        type: String,
        required: false
    },
     //'summary' of the article
     summary: {
        type: String,
        required: false
    },
    //'link' of the article
    link: {
        type: String,
        required: false
    },
    //'note' is an object that contains only a Note id
    //the 'ref' property references the 'Note' model so we can populate with an associated Note
    comments:{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

//Export the Article model
module.exports = Article;