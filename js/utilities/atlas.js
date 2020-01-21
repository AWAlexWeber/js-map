// Atlas code!

// Default index for the default atlas
let currentAtlasIndex = 0;
let atlasCategores = {};

$(document).ready(function() {
    loadDefaultAtlas();
});

function loadDefaultAtlas() {

    let data = new FormData();
    data.append("method", "GET");
    data.append("atlas_id", currentAtlasIndex);

    // Grabbing all of the atlas data for the default atlas...
    sendData("atlas/atlas.php", data, loadAtlasCallback);

}

function loadAtlasCallback(data) {
    // Using the callback data to define our atlas dimensions...
    let jsonInput = JSON.parse(data)[0];
    atlasCategores = JSON.parse(jsonInput['categories']);

    // Setting up map data...
    MAP_NAME = jsonInput['atlas_name'];
    MAP_WIDTH = jsonInput['atlas_width'];
    MAP_HEIGHT = jsonInput['atlas_height'];
    MAP_FULL_EXTENT = [0,0, MAP_WIDTH, MAP_HEIGHT];
    MAP_FULL_PROJECTION = new ol.proj.Projection({
        code: 'main',
        units: 'pixels',
        extent: MAP_FULL_EXTENT
    });

    initMap();
}