// Javascript code that handles the map //

let MAP_WIDTH = 5000;
let MAP_HEIGHT = 5000;
let MAP_FULL_EXTENT = [0,0, MAP_WIDTH, MAP_HEIGHT];
let MAP_FULL_PROJECTION = new ol.proj.Projection({
    code: 'main',
    units: 'pixels',
    extent: MAP_FULL_EXTENT
});

// Function that creates the map object...
function initMap() {
    // Initializing the map
    map = new ol.Map({
        target: 'map_main_holder',
        layers: [],
        view: new ol.View({
            projection: MAP_FULL_PROJECTION,
            center: ol.extent.getCenter(MAP_FULL_EXTENT),
            zoom: 3,
            maxZoom: 6,
            minZoom: 2
        })
    });

    // Loading the grid
    loadGrid();

    // Loading the clicking stuff
    initMapClick();
}

// Function that loads in the grid image...
function loadGrid() {

    let new_layer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: "assets/velinia.png",
            projection: MAP_FULL_PROJECTION,
            imageExtent: MAP_FULL_EXTENT,
        })
    });

    map.addLayer(new_layer);
    console.log(new_layer);
    console.log("Added layer...");
}

$(document).ready(function() {
    initMap();
});