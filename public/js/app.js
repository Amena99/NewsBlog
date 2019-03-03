$.getJSON("/articles", function (data){
    console.log("-------logging from article.js-------");
    console.log(data);
    res.render("index", data);
});

