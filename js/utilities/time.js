// File for handling time

let TIME = 49999;
let time_input = null;

$(document).ready(function(e) {
    time_input = $("#time_input_bar");
    time_input.val(TIME);

    time_input.focusout(function(e) {
        TIME = time_input.val();

        // Forcing a refresh with the new time set...
        refreshDisplay();
    });
});