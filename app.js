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

    let buttonPops = function () {
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
    buttonPops();


    let gifPopulate = function () {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let gifs = response.data
            for (let i = 0; i < gifs.length; i++) {
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
            }
        });
    }
    $(".topicButton").on("click", function (event) {
        event.preventDefault();
        $("#images").empty();
        let choice = $(this).attr("id");
        console.log(choice);
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5mXKXvoG27jxPSeOXNPOxkO9GSWsxtIl&q=" + choice + "&limit=10";
        gifPopulate();

    });
    $(".searchButton").on("click", function (event) {
        event.preventDefault();
        $("#images").empty();
        let search = $("#search").val().trim();
        console.log(search);
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5mXKXvoG27jxPSeOXNPOxkO9GSWsxtIl&q=" + search + "&limit=10";
        gifPopulate();

    });
    $(".gif").on("click", function (event) {
        event.preventDefault();
        console.log("clicked")
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
      });

})
