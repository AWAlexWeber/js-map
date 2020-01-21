// Primary file for saving and loading cookies

// Function that will load all data from cookies, save it, and reload it
function loadFromCookies() {

    // Saving the cookies now to our local system, then doing a general reload
    let cookieToLoad = JSON.parse(this.getCookie("info"));
    console.log(cookieToLoad);

    // Setting map variables
    let mapTarget = [Math.round(cookieToLoad.map_x),Math.round(cookieToLoad.map_y)];
    map.getView().setCenter(mapTarget);
    map.getView().setZoom(Math.round(cookieToLoad.map_zoom));

    // Errors we need to deal with; did we load BIGGER option sets from our local system?
    let terrainEnablingLength = terrainEnabling.length;
    let cityEnablingLength = cityEnabling.length;
    let landEnablingLength = landEnabling.length;
    let labelEnablingLength = labelEnabling.length;

    // Setting local variables, only if matching lengths confirm...
    if (labelEnablingLength == cookieToLoad.labelEnabling.length)
        labelEnabling = cookieToLoad.labelEnabling;
    else {
        // Okay, the 'offsite' one is probably most accurate
        // Lets merge the datasets, then append on the new set
        for (let index in cookieToLoad.labelEnabling) {
            // Using our cookie to set for index that is already set...
            labelEnabling[index] = cookieToLoad.labelEnabling[index];
        }
    }

    // Setting local variables, only if matching lengths confirm...
    if (terrainEnablingLength == cookieToLoad.landEnabling.length)
        terrainEnabling = cookieToLoad.terrainEnabling;
    else {
        // Okay, the 'offsite' one is probably most accurate
        // Lets merge the datasets, then append on the new set
        for (let index in cookieToLoad.terrainEnabling) {
            // Using our cookie to set for index that is already set...
            terrainEnabling[index] = cookieToLoad.terrainEnabling[index];
        }
    }

    if (cityEnablingLength == cookieToLoad.landEnabling.length)
        cityEnabling = cookieToLoad.cityEnabling;
    else {
        // Okay, the 'offsite' one is probably most accurate
        // Lets merge the datasets, then append on the new set
        for (let index in cookieToLoad.cityEnabling) {
            // Using our cookie to set for index that is already set...
            cityEnabling[index] = cookieToLoad.cityEnabling[index];
        }
    }

    if (landEnablingLength == cookieToLoad.landEnabling.length)
        landEnabling = cookieToLoad.landEnabling;
    else {
        // Okay, the 'offsite' one is probably most accurate
        // Lets merge the datasets, then append on the new set
        for (let index in cookieToLoad.landEnabling) {
            // Using our cookie to set for index that is already set...
            landEnabling[index] = cookieToLoad.landEnabling[index];
        }
    }

    // Now to refresh with the new views...
    // Reloading the display...
    this.drawCities();
    this.drawTerrain();
    this.refreshDisplay();
}

// Function that will save all of the current cookies
function updateCookies() {

    // Creating the output JSON
    let output = {};

    // Grabbing positional data, turning it to a string
    let center = map.getView().getCenter();
    let map_x = Math.trunc(center[0]);
    let map_y = Math.trunc(center[1]);
    map_x = Math.abs(map_x);
    map_y = Math.abs(map_y);
    map_x = map_x.toString();
    map_y = map_y.toString();

    let zoom = map.getView().getZoom();
    let map_zoom = zoom.toString();

    output.map_x = map_x;
    output.map_y = map_y;
    output.map_zoom = Math.round(map_zoom);

    output.landEnabling = landEnabling;
    output.cityEnabling = cityEnabling;
    output.terrainEnabling = terrainEnabling;
    output.labelEnabling = labelEnabling;

    // First we must combine everything into JSON
    // Converting to string
    let outputJSON = JSON.stringify(output);
    console.log(outputJSON);
    document.cookie = "info="+outputJSON;
    console.log(document.cookie);
}


// Functioning that will load all cookies
$(document).ready(function() {

    // Waiting half a second to load all of the cookies out
    setTimeout(function () {

        // Saving to cookies
        loadFromCookies();
    }, 500);
});

// Function for saving cookies before unloading
window.onbeforeunload = function (evt) {

    this.updateCookies();
    evt.preventDefault();
}

// Function to aide with getting cookies
function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

// Function for saving cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}