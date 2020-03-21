$(document).ready(function () {

    var topics = ["Anime",
        "Supernatural",
        "The Office",
        "Cats",
        "Ducks",
        "The Simpsons",
        "Sherlock",
        "Disney",
        "Marvel",
        "Vaporwave",
        "Aesthetic",
        "Rock n Roll"];

// making the topics buttons
    function renderButtons() {
        $("#buttons").empty();

        for (let i = 0; i < topics.length; i++) {

            let topic = topics[i]
            var category = $("<button>")
            category.addClass("btn")
            category.addClass("topicButton")
            category.attr("id", topic)
            category.text(topic)
            $("#buttons").append(category)

        };

    }
    renderButtons();
// adding new topics
    $(".searchButton").on("click", function (event) {
        event.preventDefault();
        var search = $("#search").val().trim();
        topics.push(search);
        renderButtons();
    });
// function for the API
    let gifPopulate = function () {

        let choice = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5mXKXvoG27jxPSeOXNPOxkO9GSWsxtIl&q=" + choice;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#images").empty();
            console.log(response);
            let gifs = response.data

            // forloop for the topics
            for (let i = 0; i < 10; i++) {
                // gif coding
                var leGif = $("<img>")
                leGif.attr("alt", gifs[i].title)
                leGif.attr("src", gifs[i].images.fixed_height_still.url)
                leGif.attr("data-still", gifs[i].images.fixed_height_still.url)
                leGif.attr("data-animate", gifs[i].images.fixed_height.url)
                leGif.attr("data-state", "still").addClass("gif")
                // rating code
                let ratings = $("<div>")
                ratings.attr("id", "ratings")
                let gifRate = $("<h6>").addClass("rating")
                gifRate.attr("id", gifs[i].rating)
                gifRate.append("Rating: ", gifs[i].rating)
                // putting it on the page
                ratings.append(gifRate, leGif);
                $("#images").append(ratings);
                // console.log($(".gif")[i].dataset)
            };
            // playing and pausing gifs
            $("img").on("click", function (event) {
                event.preventDefault();
                var gif = $(this)
                var state = gif.attr("data-state")
                var animate = gif.attr("data-animate")
                var still = gif.attr("data-still")
                if (state == "still") {
                    gif.attr("src", animate)
                    gif.attr("data-state", "animate")
                } else {
                    gif.attr("src", still)
                    gif.attr("data-state", "still")
                }


            })

        });

    }
    // makings the gifs show up on click
    $(document).on("click", ".topicButton", gifPopulate)


});
