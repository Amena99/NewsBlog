$.getJSON("/articles", function (data){
    console.log("-------logging from article.js-------");
    console.log(data);
    // res.render("index", data);
});

$(document).on("click", "p", function() {
   
    const thisId = $(this).attr("data-id");
    console.log("logging thisId in p click function");
    console.log(thisId);
    $("#articleid").val(thisId);
    //Make an ajax call for the article
    $.ajax({
        method: "GET",
        url: "articles/"+thisId
    })
    //Once it comes back, display note information to the page
    .then(function(data) {
        console.log("Logging article recieved in ajax call app.js")
        console.log(data);
        if(data.comment) {
          //Display the data
        $("#articleid").val(data._id);
        $("#articletitle").val(data.title);
        $("#usernameinput").val(data.comment.username);
        $("#titleinput").val(data.comment.title);
        $("#commentinput").val(data.comment.body);  
        }
    });
});

//Save new comment to the database
$(document).on("click", "#submitcomment", function() {
    //Get ID associated with the article from submit button
    const thisId = $("#articleid").val().trim();
    console.log("Logging in the POST method of app.js");
    console.log(thisId);

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            //Value taken from 
            title: $("#titleinput").val(),
            body: $("#commentinput").val()
        }
    })
    //Once that is done
    .then(function(data){
        //Log the response
        console.log(data)
        //Empty the notes section
        
    })
})