


// first we need to set up the function that will grab the data we want when the buttons are clicked
$(document).ready(function() { 
// here we will dynamically create the buttons

    var topics = ["drake", "rihanna", "travis scott", "kanye west", "kid cudi", "the weeknd"];
// for (let index = 0; index < array.length; index++) {
//     }

  // "this" is referring to the button that was clicked\\
  // data- is referring to the information we are collecting.\\
  $(document).on("click", ".gifSearch", function() {
    event.preventDefault();
    // attr is used to grab or add things inside of the <> tags, see lines 10-13\\
    var artist = $(this).attr("data-music");
    
    // var animal = $(this).attr("data-animal", "pig"); --> this is how we add to the attr
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      artist + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";  
      
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });


  });

  function renderButtons() {
    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonContainer").empty();
    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie to our button
      // Adding a data-attribute
      a.attr("data-music", topics[i]);
      a.addClass("gifSearch");
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#buttonContainer").append(a);
    }
  }

// This function handles events where one button is clicked
$("#searchButton").on("click", function(event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#newTerm").val().trim();
  // Adding the movie from the textbox to our array
  topics.push(topic);
  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

  renderButtons();
});



// first we will have our click listeners
// 



