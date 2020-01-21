let CLICK_MENU = null;
let RIGHT_CLICK_MENU = null;
let MOUSE_X = null;
let MOUSE_Y = null;
let devEnabled = false;
let adminEnabled = false;

$(document).ready(function() {

    $(".popup_x").click(function(e) {
        hide_click_popup();
    });

    $("#popup_close_button").click(function(e) {
        hide_click_popup();
    });

    $("#popup_create_button").click(function(e) {

        // Assembling dataset...
        let x = $(".popup_location_x").text();
        let y = $(".popup_location_y").text();

        x = x.substr(x.indexOf(" ") + 1);
        y = y.substr(y.indexOf(" ") + 1);

        // Getting the title
        let title = $(".creation_title_input").val();

        // Getting the type and land
        let type = $("#popup_select_type_selector_obj option:selected").val();
        let land_id = $("#popup_land_selector option:selected").val();

        // Building the type category
        let type_category = type.substr(0, type.indexOf("_")) + "_" + landJSON[land_id - 1]['title'] + "_" + type.substr(type.indexOf("_") + 1);
        type_category = type_category.toLowerCase();

        // Getting the atlas ID
        let atlas_id = $(".popup_info_atlas").text();
        atlas_id = atlas_id.substr(atlas_id.indexOf("#") + 1);

        // Getting the timeset
        let creation_date = $("#creation_time").val();
        let destruction_date = $("#destruction_time").val();

        if (destruction_date <= 0) {
            destruction_date = "50000";
        }

        // Creating the dataset for insertion...

        let data = new FormData();
        data.append('x', x);
        data.append('y', y);
        data.append('title', title);
        data.append('type', type);
        data.append('land_id', land_id);
        data.append('type_category', type_category);
        data.append('atlas_id', atlas_id);
        data.append('creation_date', creation_date);
        data.append('destruction_date', destruction_date);
        data.append('method', "POST");
        data.append('user_id', ACCOUNT_ID);
        data.append('account_key', ACCOUNT_KEY);

        let url = "misc/create.php";

        sendData(url, data, createTerrainCallback)
    });
});

function createTerrainCallback(data) {
    console.log(data);
    if (data === "Success") {
        alert("Success!");
        hide_click_popup();
        loadMapLandData();
        loadAtlasCityData();
        loadMapTerrainData();
        loadMapIcons();
    }
    else {
        alert(data);
    }
}


function initMapClick() {

    map.on("click", function(e) {
        console.log("Click");
        if (devEnabled) {

            MOUSE_X = e.coordinate[0];
            MOUSE_Y = e.coordinate[1];

            display_click_popup(MOUSE_X, MOUSE_Y);
        }
    });


    $(document).mousemove(function(e) {
        MOUSE_X = e.pageX;
        MOUSE_Y = e.pageY;
    });

    map.getViewport().addEventListener('contextmenu', function (evt) {
        processRightClick(evt);
    });

    // Getting the click menu
    CLICK_MENU = $(".click_menu");
    RIGHT_CLICK_MENU = $(".right_click_menu");
}

function display_click_popup(x, y) {
    let popupBox = $(".popup_background");
    popupBox.css('width', '100vw');
    popupBox.css('height', '100vh');
    popupBox.css('margin-top', '0vw');

    x = Math.round(x);
    y = Math.round(y);

    $(".popup_location_x").text("X: " + x);
    $(".popup_location_y").text("Y: " + y);
    $(".popup_info_atlas").text("Atlas ID: #" + currentAtlasIndex);

    // Attempting to automatically assign the ID of the land mass by the click location
    let land_mass_id = -1;
    let land_mass_title = ""

    for (let entry in landJSON) {
        let land = landJSON[entry];
        if (x > land['x1'] && x < land['x2'] && y > land['y1'] && y < land['y2']) {
            // Making sure it isnt full
            if (land['title'] == "Full") {
                continue;
            }

            // Skipping if we arent selected
            if (landEnabling[entry] !== 1) {
                continue;
            }

            // Okay lets set this ID
            land_mass_title = land['title'];
            land_mass_id = land['land_id'].toString();
        }
    }

    // Building the list to display all of the land options...
    $('#popup_land_selector').find('option').remove();

    for (let land_index in landJSON) {
        let land = landJSON[land_index];
        let land_name = land['title'];
        let land_id = land['land_id'];
        $('<option/>', { value : land_id }).text(land_name).appendTo('#popup_land_selector');

    }

    // Forcing the creation time to be the land creation time, just in case we want to use that...
    let current_creation_time = $("#creation_time").val()
    if (current_creation_time == null || current_creation_time == undefined || current_creation_time.length <= 0) {
        let land_creation_time = JSON.parse(landJSON[land_mass_id]['time_set'])[0][0];
        $("#creation_time").val(land_creation_time);
    }

    land_mass_id = land_mass_id.toString();
    console.log(land_mass_id);
    $("#popup_land_selector").val(land_mass_id);
}

function hide_click_popup() {
    let popupBox = $(".popup_background");
    popupBox.css('width', '0vw');
    popupBox.css('height', '0vh');
    popupBox.css('margin-top', '-5000px');
}


function processRightClick(evt) {
    evt.preventDefault();
}