      // Initial array of movies
      var animals = ["lion", "tiger", "bear"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayAnimalGifs() {

        $("#animal-view").empty();

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PSGz1PJiAkf3KhGbNZhuetNSqqRzmIRN&q=" + animal + "&limit=10&offset=0&rating=G&lang=en"
        var gifs = [];

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            
            for (var i=0; i < response.data.length; i++) {

                var animalDiv = $("<div class='animal'>");
                var animalGif = $("<img class='animal-img'>");
                var newRating = $("<p>");

                animalGif.attr("src", response.data[i].images.original_still.url);
                animalGif.attr("still", response.data[i].images.original_still.url);
                animalGif.attr("animate", response.data[i].images.original.url);
                animalGif.attr("data-state", "still");

                animalDiv.append(animalGif);
                newRating.text("Rating: " + response.data[i].rating);
                animalDiv.append(newRating);

                $("#animal-view").append(animalDiv);

            }

        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        console.log(animal);
        // Adding movie from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".animal-btn", displayAnimalGifs);

      $(document).on("click", ".animal-img", function() {

        console.log("it works");
        var state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate");
        
        } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("data-state", "still");
        } 


      });
    
    
    
    
    
    
    
    
    
    

      // Calling the renderButtons function to display the intial buttons
      renderButtons();