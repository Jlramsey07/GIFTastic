// Array of Topics to use for Buttons
var topics = ["lil wayne", "Jay-Z", "Bob Marley", "Kanye west", "eminem", "Meek Mill", "Drake", "Sean Paul"]


function displayTopicInfo() {
	var musicians = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Km0F0XusyMDHtFK2iedq7AnQksu1qPpd&q=" + musicians + "&limit=10&offset=0&rating=PG-13&lang=en";

	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response) {
		//sets the Length for the next loop
		var results = response.data;
		//Clear Previous 
		$("#musics").empty();
		// For Loop  to show multiple Giphys
		for (var i = 0; i < results.length; i++) {
		
		
		var topicDiv = $("<div class='musicians'>");
		
		var rating = response.data[i].rating;
		// Create Element  rating 
		var pRate = $("<p>").text("Rating: " + rating);
		// Adding Rating to Topic Div
		topicDiv.append(pRate);
		
		var giphyImgStill = response.data[i].images.downsized_still.url;
		
		var giphyImgMotion = response.data[i].images.downsized.url;
		// Create Image Element
		var image = $("<img>").attr("src", giphyImgStill);
		// image attributes
		image.attr("data-still", giphyImgStill);
		image.attr("data-animate", giphyImgMotion);
		image.attr("data-state", "still");
		image.attr("id", "img"+i)
		//Give images a class
		image.addClass("giphyImages");
		// Appending the Image
		topicDiv.prepend(image);
		// Write Topic Div to HTML document
		$("#musics").prepend(topicDiv);
		}
	})
}

function renderButtons() {
	// Clears musicButtons Div
	$("#musicButtons").empty();

	// Looping through topics
	for (var i = 0; i < topics.length; i++) {
		// Code to Dynamically Generate Buttons for each Topic in topics array
		var a = $("<button>");
		// Adding a class of Topic to our Button
		a.addClass("topic");
		// Adding a class for styling
		a.addClass("btn btn-lg");
		// Adding a data-attribute
		a.attr("data-name", topics[i]);
		// adding attr for Bootstrap
		a.attr("type", "button");
		// Button Text
		a.text(topics[i]);
		// Adding the Button to the Buttons Div
		$("#musicButtons").append(a);
	}
}

// This function handles events where a Topic button is clicked
$("#addmusic").on("click", function(event) {
	event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#music-input").val().trim();
    // Adding movie from the textbox to our array
    topics.push(topic);
    // Clear the form field for next addition
    $("form").trigger("reset")
	
    renderButtons();
    });

// Adding a click event listener to all elements with a class of "topic"
$(document).on("click", ".topic", displayTopicInfo);

renderButtons();




// Add a listener 
$(document).on("click", ".giphyImages", flipAnimate);



function flipAnimate() {
	var item = $(this).attr("id");
	item = "#"+item;
	// console.log(item);
	var state = $(item).attr("data-state");
	console.log(state);
	if (state === "still") {
        $(item).attr("src", $(item).attr("data-animate"));
        $(item).attr("data-state", "animate");
        // console.log(this);
      } else {
        $(item).attr("src", $(item).attr("data-still"));
        $(item).attr("data-state", "still");
        // console.log(this);
      };
};