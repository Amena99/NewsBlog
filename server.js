//server:
const express = require("express");
const logger = require("morgan");
const exphbs = require("express-handlebars");

//database:
const mongoose = require("mongoose");

//package to make http requests: 
const axios = require("axios");

//package to parse:
const cheerio = require("cheerio");

// require all models from models folder
const db = require("./models");
const PORT = process.env.PORT || 3000;

//Initialize Express
const app = express();

//**Configure Middleware**
//Use Morgan logger for logging requests
app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Make handlebars the view engine
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//Connect to the MongoDB
mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/newsblog",{
    useNewUrlParser: true});

//Routes
//GET - scraping the NY Times website
app.get("/scrape", function(req, res){
    axios.get("https://www.nytimes.com/").then(function (response){
        const $ = cheerio.load(response.data);

        $("article").each(function(i, element){
            //object to save results
            let result = {};

            //save as properties of result object
            // console.log ($(this)); 
            result.title = $(this)
                .find("h2")
                .text();
            result.summary = $(this)
                .find("p")
                .text();
            result.link = $(this)
                .find("a")
                .attr("href");
            
            console.log(result);

            db.Article.create(result)
                .then(function(dbArticle){
                    //view added result
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});

require("./routes/articleRoutes")(app);
require("./routes/commentRoutes")(app);

//Route for getting the one article that is associated with Note

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
  