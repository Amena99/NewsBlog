$.getJSON("/articles", function (data){
    console.log("-------logging from article.js-------");
    console.log(data);
    // res.render("index", data);
});

$(document).on("click", "p", function() {
    $("#usernameinput").empty();
    $("#titleinput").empty();
    $("#commentinput").empty();
    //Find the article id and save it in thisId
    const thisId = $(this).attr("data-id");
    console.log("logging thisId in p click function");
    console.log(thisId);

    //Make an ajax call for the article
    $.ajax({
        method: "GET",
        url: "articles/"+thisId
    })
    //Once it comes back, display note information to the page
    .then(function(data) {
        console.log("Logging article recieved in ajax call app.js")
        console.log(data);
    });
});