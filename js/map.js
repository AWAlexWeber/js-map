////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//  MAP FILE DEALS ONLY WITH LOCAL MAP HANDLING ETC!! //
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

/////////////////////////
// Options and Display //
/////////////////////////
// Variable determines if clicking out will close menues
let clickHidesView = false;
let FORCE_TIME_DISPLAY_RESTRICTION = false;
let FORCE_LAND_DISPLAY_RESTRICTION = true;

///////////////////
// MAP VARIABLES //
///////////////////

// Some default variables to help with initializing the map...

// Default extent and projection, important!
// This SHOULD be overridden when we first load the default Atlas (note: should still be the same values...)
let MAP_NAME = "ERROR"; //"Terra";
let MAP_WIDTH = 0; //10000;
let MAP_HEIGHT = 0; //6923;
let MAP_FULL_EXTENT = null; //[0,0, MAP_WIDTH, MAP_HEIGHT];
let MAP_FULL_PROJECTION = null; /*new ol.proj.Projection({
    code: 'main',
    units: 'pixels',
    extent: MAP_FULL_EXTENT
});*/

// Object that contains the actual JSON for the terrain pieces
let landJSON = [];
// JSON Object that represents the enabling of certain values
let landEnabling = {};
// Object that contains all of the layers
let landLayers = {};
// Map base object
let map = null;

// Data for cities
let cityJSON = [];
let cityEnabling = {};

// Data for labels
let labelJSON = [];
let labelEnabling = {};

// Data for the icons
let iconJSON = [];

// Data for terrain!
// TerrainJSON is the direct JSON data from the server,
// where as terrain enabling contains indexing set on whats enabled and what isn't
let terrainJSON = [];
let terrainEnabling = [];

//////////////
// MAP CODE //
//////////////

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
            maxZoom: 9,
            minZoom: 2
        })
    });

    loadMapLandData();
    loadAtlasCityData();
    loadMapTerrainData();
    loadMapLabels();
    loadMapIcons();
    initMapClick();
}

// Function for processing city data
function processMapCity() {
    for (city in cityJSON) {
        cityEnabling[city] = 0;
    }
}

function showAllLand() {

    for (terrainIterator in landEnabling) {

        // If land enabling is already created, lets skip here...
        console.log(Object.keys(landEnabling).length);

        // Not displaying anything with full
        let title = landJSON[terrainIterator].title.toLowerCase();
        if (title.indexOf("full") != -1) {
            continue;
        }

        landEnabling[terrainIterator] = 1;
    }

    updateLandCheckboxes();
    refreshDisplay();
}

function hideAllLand() {
    for (terrainIterator in landEnabling) {
        landEnabling[terrainIterator] = 0;
    }

    updateLandCheckboxes();
    refreshDisplay();
}

function hideAllLabels() {
    for (labelIterator in labelEnabling) {

        labelEnabling[labelIterator] = 0;
    }
    updateLabelCheckboxes();
}

function showAllLabels() {
    for (labelIterator in labelEnabling) {
        labelEnabling[labelIterator] = 1;
    }
    updateLabelCheckboxes();
}

function hideAllCities() {
    for (cityIterator in cityEnabling) {

        cityEnabling[cityIterator] = 0;
    }
    updateCityCheckboxes();
}

function showAllCities() {
    for (cityIterator in cityEnabling) {
        cityEnabling[cityIterator] = 1;
    }
    updateCityCheckboxes();
}

function showAllTerrain() {
    for (terrain in terrainEnabling) {
        terrainEnabling[terrain] = 1;
    }

    updateTerrainCheckboxes();
}

function hideAllTerrain() {
    for (terrain in terrainEnabling) {
        terrainEnabling[terrain] = 0;
    }

    updateTerrainCheckboxes();
}

// Function for 'loading' the terrain from landJSON
function processMapLand() {

    let createLandEnabling = false;
    if (Object.keys(landEnabling).length <= 0) {
        createLandEnabling = true;
    }

    // Creating the enabling list and layers
    for (land in landJSON) {
        let landJSONObject = landJSON[land];

        // Iterating on each land component
        // Skipping this step if its already set
        if (createLandEnabling) {
            landEnabling[land] = 0;
        }

        // Creating the layers!

        // First we need a new projection
        let map_extent = [landJSONObject.x1,landJSONObject.y1,landJSONObject.x2,landJSONObject.y2];
        let temp_layer = new ol.layer.Image({
            source: new ol.source.ImageStatic({
                url: landJSONObject.land_image_source,
                projection: MAP_FULL_PROJECTION,
                imageExtent: map_extent,
            })
        });

        // Adding to the list
        landLayers[land] = temp_layer;
    }

    // We have created our layers!
    // Now to run the final display (for now)
    refreshDisplay();
}

// Function for 'processing' the recieved map label data
// Primarily what we are doing is setting up the enabling array
function processMapLabel() {

    let createLabelEnabling = false;
    if (Object.keys(labelEnabling).length <= 0) {
        createLabelEnabling = true;
    }

    for (label in labelJSON) {

        if (createLabelEnabling) {
            labelEnabling[label] = 0;
        }
    }
}

// Function for 'processing' the recieved map terrain data
// Primarily what we are doing is setting up the enabling array
function processMapTerrain() {

    let createTerrainEnabling = false;
    if (Object.keys(terrainEnabling).length <= 0) {
        createTerrainEnabling = true;
    }

    for (terrain in terrainJSON) {
        if (createTerrainEnabling) {
            terrainEnabling[terrain] = 0;
        }
    }
}

// Function for refreshing display, re-displayes all layers :O
function refreshDisplay() {

    // Deleting all the old layers...
    map.setLayerGroup(new ol.layer.Group());
    map.getOverlays().clear();

    // Adding all the layers that need to be added
    // NOTE: If a layer is NOT set to 1 in the enabled layer group, we skip!
    for (let layer in landEnabling) {
        let index = layer;

        // First; should we display this land at all? Checking for time-bsaed restrictions...
        let timeset = landJSON[index]['time_set'];
        if (timeset != null && FORCE_TIME_DISPLAY_RESTRICTION) {

            let time_set = JSON.parse(timeset);
            let flag = false;
            console.log(time_set);

            for (let range in time_set) {

                let entry = time_set[range];
                console.log("Iterating on " + entry);

                if (TIME >= entry[0] && TIME <= entry[1]) {
                    console.log("FLAGGING 1 WITH " + TIME + " AND " + time_set);
                    flag = true;
                    break;
                }
            }

            if (!flag) {
                // Making sure we disable it as well...
                landEnabling[index] = 0;
            }
        }

        // Checking it in layer group
        if (landEnabling[layer] !== 1) {
            continue;
        }

        let layerObject = landLayers[layer];
        map.addLayer(layerObject);
    }

    // Refreshing cities to display
    console.log(landEnabling);

    drawCities();
    drawLabels();
    drawTerrain();
}

///////////////////////////////
// List of Display Functions //
///////////////////////////////

// These functions primarily deal with interacting between the display and the map settings

// Function for disabling - enabling layers
function toggleLandDisplay(index) {
    console.log("Refreshing land display at index of " + index);

    let currentValue = landEnabling[index];

    if (currentValue === 0)
        landEnabling[index] = 1;
    else
        landEnabling[index] = 0;

    console.log("Now set to " + landEnabling[index]);
    refreshDisplay();
}

// Function for toggling a cateogry of city display
function toggleCityCategory(category, toggleValue) {

    for (city in cityJSON) {
        let cityCategory = cityJSON[city]['type_category'].toLowerCase();

        // Checking if it matches
        category = category.toLowerCase();

        if (cityCategory.indexOf(category) !== -1) {
            let newValueToSet = 1;
            if (toggleValue)
                newValueToSet = 0;

            cityEnabling[city] = newValueToSet;
        }
    }

    // Updating display checkboxes for city
    updateCityCheckboxes();
}

// Function for toggling a specific city
function toggleCityIndividualCheck(index, value) {

    // Setting the specific city enabling to true
    let newValue = 1;
    if (value) newValue = 0;

    cityEnabling[index] = newValue;
    console.log(cityEnabling);

    // Updating display checkboxes for city
    updateCityCheckboxes();
}

// Function for displaying / disabling a certain land type
function toggleCityLand(index, value) {

    for (city in cityJSON) {
        let cityCategory = cityJSON[city]['land_id'];

        if (index === cityCategory) {
            let newValueToSet = 1;
            if (value)
                newValueToSet = 0;

            cityEnabling[city] = newValueToSet;
        }
    }

    // Now we need to update those damn city checkboxes...
    // Updating display checkboxes for city

    updateCityCheckboxes();

}

// Function for drawing terrain features
function drawTerrain() {
    console.log("Drawing terrain...");

    // This guy is used to track the markers as a layer
    let marker_source = new ol.source.Vector({});

    // Iterating on all of the primary iterators

    for (terrainIterator in terrainEnabling) {
        if (terrainEnabling[terrainIterator] === 1) {
            console.log(terrainJSON);
	    console.log(terrainIterator);
            console.log(terrainEnabling);
            let terrain = terrainJSON[terrainIterator];
            let terrain_id = terrain['land_id'] - 1;
            if (landEnabling[terrain_id] == 0 && FORCE_LAND_DISPLAY_RESTRICTION) {
                continue;
            }

            // Checking if we exist in the current timeframe...
            let timeset = terrain['time_set'];
            if (timeset != null && FORCE_TIME_DISPLAY_RESTRICTION) {
                // Iterating on all the possible timesets
                let flag = false;

                time_set = JSON.parse(timeset);

                for (let range in time_set) {
                    let entry = time_set[range];
                    if (TIME > entry[0] && TIME < entry[1]) {
                        flag = true;
                        break;
                    }
                }

                if (!flag) {
                    continue;
                }
            }

            // Aggregating data needed to display this
            let terrain_title = terrain['title'];

            let x = terrain['position_x'];
            let y = terrain['position_y'];

            let iconIndex = terrain['icon'];
            iconIndex--;

            let iconObj = iconJSON[iconIndex];
            let icon = iconObj.ico_path;

            // Gotta adjust Y, because WHY not ;)
            y = MAP_HEIGHT - y;

            // Getting the icon so we can create the feature...
            let feature = new ol.Feature({
                geometry: new ol.geom.Point([x,y])
            });

            // Creating the icon style
            let style = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: 'assets/img/ico/' + icon,
                    scale: iconObj.scale
                }))
            });
            feature.setStyle(style);
            marker_source.addFeature(feature);

            let nodeToAdd = document.createElement("a");
            let textNode = document.createElement("div");
            let text = document.createTextNode(terrain_title);

            // Determining the width of the font...
            let font_width = terrain_title.length * 16;

            textNode.appendChild(text);

            textNode.style.color = "black";
            textNode.style.marginLeft = "-" + Math.round(font_width / 2) + "px";
            textNode.style.width = Math.round(font_width) + "px";
            textNode.style.textAlign = "center";
            textNode.style.fontWeight = "bold";
            textNode.style.marginTop = "5px";
            textNode.style.fontSize = iconObj.font_scale;
            textNode.style.textShadow = "-1px 0 #ffffff,0 1px #ffffff,1px 0 #ffffff,0 -1px #ffffff";
            textNode.className="textLabel";
            textNode.style.paddingLeft = "-50px";

            nodeToAdd.appendChild(textNode);

            let newName = "";
            // Removing all spaces from the name...
            for (let i = 0; i < terrain_title.length; i++) {
                let letter = terrain_title.substring(i,i+1);
                if (letter === " ") {
                    letter = "_";
                }
                newName = newName + letter;
            }

            nodeToAdd.href = "http://www.awalexweber.com/dndwiki/index.php/" + newName;

            let label_tmp = new ol.Overlay({
                position: [x, y],
                element: nodeToAdd
            });
            map.addOverlay(label_tmp);
        }
    }

    // Finalizing the layer...
    let marker_layer = new ol.layer.Vector({
        source: marker_source
    });

    // Loading markers into display
    map.addLayer(marker_layer);
}


// Function for drawing terrain features
function drawLabels() {
    console.log("Drawing labels...");

    // This guy is used to track the markers as a layer
    let marker_source = new ol.source.Vector({});

    // Iterating on all of the primary iterators

    for (labelIterator in labelEnabling) {
        if (labelEnabling[labelIterator] === 1) {
            let label = labelJSON[labelIterator];
            console.log(labelIterator);
            console.log(labelEnabling);
            console.log(labelJSON);

            let land_id = label['land_id'] - 1;
            if (landEnabling[land_id] == 0 && FORCE_LAND_DISPLAY_RESTRICTION) {
                continue;
            }

            // Checking if we exist in the current timeframe...
            let timeset = label['time_set'];
            if (timeset != null && FORCE_TIME_DISPLAY_RESTRICTION) {
                // Iterating on all the possible timesets
                let flag = false;

                time_set = JSON.parse(timeset);

                for (let range in time_set) {
                    let entry = time_set[range];
                    if (TIME > entry[0] && TIME < entry[1]) {
                        flag = true;
                        break;
                    }
                }

                if (!flag) {
                    continue;
                }
            }

            // Aggregating data needed to display this
            let label_title = label['title'];

            let x = label['position_x'];
            let y = label['position_y'];

            let iconIndex = label['icon'];
            iconIndex--;

            let iconObj = iconJSON[iconIndex];
            let icon = iconObj.ico_path;

            // Gotta adjust Y, because WHY not ;)
            y = MAP_HEIGHT - y;

            // Getting the icon so we can create the feature...
            let feature = new ol.Feature({
                geometry: new ol.geom.Point([x,y])
            });

            // Creating the icon style
            let style = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: 'assets/img/ico/' + icon,
                    scale: iconObj.scale
                }))
            });
            feature.setStyle(style);
            marker_source.addFeature(feature);

            let nodeToAdd = document.createElement("a");
            let textNode = document.createElement("div");
            let text = document.createTextNode(label_title);

            // Determining the width of the font...
            let font_width = label_title.length * 16;

            textNode.appendChild(text);

            textNode.style.color = "black";
            textNode.style.marginLeft = "-" + Math.round(font_width / 2) + "px";
            textNode.style.width = Math.round(font_width) + "px";
            textNode.style.textAlign = "center";
            textNode.style.fontWeight = "bold";
            textNode.style.marginTop = "5px";
            textNode.style.fontSize = iconObj.font_scale;
            textNode.style.textShadow = "-1px 0 #ffffff,0 1px #ffffff,1px 0 #ffffff,0 -1px #ffffff";
            textNode.className="textLabel";
            textNode.style.paddingLeft = "-50px";

            nodeToAdd.appendChild(textNode);

            let newName = "";
            // Removing all spaces from the name...
            for (let i = 0; i < label_title.length; i++) {
                let letter = label_title.substring(i,i+1);
                if (letter === " ") {
                    letter = "_";
                }
                newName = newName + letter;
            }

            nodeToAdd.href = "http://www.awalexweber.com/dndwiki/index.php/" + newName;

            let label_tmp = new ol.Overlay({
                position: [x, y],
                element: nodeToAdd
            });
            map.addOverlay(label_tmp);
        }
    }

    // Finalizing the layer...
    let marker_layer = new ol.layer.Vector({
        source: marker_source
    });

    // Loading markers into display
    map.addLayer(marker_layer);
}

// Function for drawing cities
function drawCities() {

    console.log("Drawing cities...");

    // This guy is used to track the markers as a layer
    let marker_source = new ol.source.Vector({});

    // Iterating on all of the primary iterators
    for (cityIterator in cityEnabling) {
        if (cityEnabling[cityIterator] === 1) {

            let city = cityJSON[cityIterator];
            let land_id = city['land_id'] - 1;
            if (landEnabling[land_id] == 0 && FORCE_LAND_DISPLAY_RESTRICTION) {
                continue;
            }

            // Checking if we exist in the current timeframe...
            let timeset = city['time_set'];
            if (timeset != null && FORCE_TIME_DISPLAY_RESTRICTION) {
                // Iterating on all the possible timesets
                let flag = false;

                time_set = JSON.parse(timeset);

                for (let range in time_set) {
                    let entry = time_set[range];
                    if (TIME > entry[0] && TIME < entry[1]) {
                        flag = true;
                        break;
                    }
                }

                if (!flag) {
                    continue;
                }
            }

            // Aggregating data needed to display this
            let city_title = city['title'];
	    console.log(city_title);
            let x = city['position_x'];
            let y = city['position_y'];

            let iconIndex = city['icon'];
            iconIndex--;

            let iconObj = iconJSON[iconIndex];
            let icon = iconObj.ico_path;

            // Gotta adjust Y, because WHY not ;)
            y = MAP_HEIGHT - y;

            // Getting the icon so we can create the feature...
            let feature = new ol.Feature({
                geometry: new ol.geom.Point([x,y])
            });

            // Creating the icon style
            let style = new ol.style.Style({
                image: new ol.style.Icon(({
                    src: 'assets/img/ico/' + icon,
                    scale: iconObj.scale
                }))
            });
            feature.setStyle(style);
            marker_source.addFeature(feature);

            let nodeToAdd = document.createElement("a");
            let textNode = document.createElement("div");
            let text = document.createTextNode(city_title);

            // Determining the width of the font...
            let font_width = city_title.length * 16;

            textNode.appendChild(text);

            textNode.style.color = "black";
            textNode.style.marginLeft = "-" + Math.round(font_width / 2) + "px";
            textNode.style.width = Math.round(font_width) + "px";
            textNode.style.textAlign = "center";
            textNode.style.marginTop = "5px";
            textNode.style.fontWeight = "bold";
            textNode.style.fontSize = iconObj.font_scale;
            textNode.style.textShadow = "-1px 0 #ffffff,0 1px #ffffff,1px 0 #ffffff,0 -1px #ffffff";
            textNode.className="textLabel";
            textNode.style.paddingLeft = "-50px";

            nodeToAdd.appendChild(textNode);

            let newName = "";
            // Removing all spaces from the name...
            for (let i = 0; i < city_title.length; i++) {
                let letter = city_title.substring(i,i+1);
                if (letter === " ") {
                    letter = "_";
                }
                newName = newName + letter;
            }

            nodeToAdd.href = "http://www.awalexweber.com/dndwiki/index.php/" + newName;

            let label_tmp = new ol.Overlay({
                position: [x, y],
                element: nodeToAdd
            });
            map.addOverlay(label_tmp);
        }
    }

    // Finalizing the layer...
    let marker_layer = new ol.layer.Vector({
        source: marker_source
    });

    // Loading markers into display
    map.addLayer(marker_layer);
}

function toggleLabelIndividualCheck(index, value) {

    let newValue = 1;
    if (value) newValue = 0;

    labelEnabling[index] = newValue;

    updateLabelCheckboxes();
}

function toggleTerrainIndividualCheck(index, value) {

    let newValue = 1;
    if (value) newValue = 0;

    terrainEnabling[index] = newValue;

    updateTerrainCheckboxes();
}

function toggleLabelLand(index, value) {

    for (label in labelJSON) {
        let labelCategory = labelJSON[label]['land_id'];

        if (index === labelCategory) {
            let newValueToSet = 1;
            if (value)
                newValueToSet = 0;

            labelEnabling[terrain] = newValueToSet;
        }
    }

    updateLabelCheckboxes();
}

function toggleTerrainLand(index, value) {

    for (terrain in terrainJSON) {
        let terrainCategory = terrainJSON[terrain]['land_id'];

        if (index === terrainCategory) {
            let newValueToSet = 1;
            if (value)
                newValueToSet = 0;

            terrainEnabling[terrain] = newValueToSet;
        }
    }

    updateTerrainCheckboxes();
}

function toggleTerrainCategory(category, toggleValue) {

    for (terrain in terrainJSON) {
        let terrainCategory = terrainJSON[terrain]['type_category'].toLowerCase();

        // Checking if it matches
        category = category.toLowerCase();

        if (terrainCategory.indexOf(category) !== -1) {
            let newValueToSet = 1;
            if (toggleValue)
                newValueToSet = 0;

            terrainEnabling[terrain] = newValueToSet;
        }
    }

    updateTerrainCheckboxes();
}

function toggleLabelCategory(category, toggleValue) {

    for (label in labelJSON) {
        let labelCategory = labelJSON[label]['type_category'].toLowerCase();

        // Checking if it matches
        category = category.toLowerCase();

        if (labelCategory.indexOf(category) !== -1) {
            let newValueToSet = 1;
            if (toggleValue)
                newValueToSet = 0;

            labelEnabling[terrain] = newValueToSet;
        }
    }

    updateLabelCheckboxes();
}
