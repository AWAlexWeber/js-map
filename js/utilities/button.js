// JS for helping display buttons better

// Waiting for document to finish loading before adding jquery stuff

$(document).ready(function() {

    // First we are going to attach the loader for all of the
    loadBottomButtons();

});

function loadBottomButtons() {
    $(".button_bottom_text").click(function() {
        // Okay, we want to load this specific guy,
        // first we need to get our class information
        let type = this.classList[1];

        // Determining which type to load...
        vertical_display_load(type, this);
    })
}