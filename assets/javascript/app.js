$(document).ready(function() {

    // Arry
    var topic = ["Al Pacino", "Robert De Niro", "Jack Nicholson", "Denzel Washington", "Kevin Costner", "Leonardo DiCaprio", "Mel Gibson"];
    var actor;
    //function that displays the gif buttons
    
    function GifButtons() {
        $("#gifView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("actor");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifView").append(gifButton);
        }
    }
    
    //function to add new button
    
    function addButton() {
        $("#addGif").on("click", function() {
            var actor = $("#topicInput").val().trim();
            if (actor == ""){
                return false;
            }
            topic.push(actor);
            GifButtons();
            $("#topic-input").val("");
            return false;
            });
    
        }
    //function to remove last button
    function removeLastButton() {
        $("#removeGif").on("click", function() {
            $("#topicinput").val("");
            event.preventDefault(); 
            topic.pop(actor);
            GifButtons();
            return false;
        });
    
    }
    
    // function that displays gifs
    
    function displayGifs() {
        var actor = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=rHiXBBNWOsBs15NOZa6jhmE8LcbEyVND&limit=10";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            //shows results of gifs
            var results = response.data;
            if (results == ""){
                alert("There is not a gif for this!");	
            }
            for (var i = 0; i<results.length; i++){
                //put gifs in a div
                var gifDiv = $("<div1>");
                //pull rating of gif
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
                //pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //paused images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //animated images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                //how images come in, already paused
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //add new div to existing divs
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    //list of already created gifs
    GifButtons();
    addButton();
    removeLastButton();
    
    

    //stop and start gif
    $(document).on("click", ".actor", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });

function newFunction_1() {
    var actor = newFunction();
    return actor;
}

function newFunction() {
    var actor;
    return actor;
}
