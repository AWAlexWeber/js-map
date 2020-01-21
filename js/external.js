////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//  ONLY DEALS WITH DOING EXTERNAL REQUESTS, ETC!!!   //
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// Base function for helping us send / recieve data...
function sendData(url, data, callback) {

    url = "/map/api/" + url;

    let jsonObject = {};

    for (const [key, value]  of data.entries()) {
        jsonObject[key] = value;
    }

    let jsonSend = JSON.stringify(jsonObject);

    $.post(url,
        jsonSend,
        function(data){
            // Got resultant data, returning that out..
            callback(data);
    });
}

// Function that primarily loads the map terrain data...
function loadMapLandData() {

    // Function for loading all of the terrain map data...
    let data = new FormData();
    data.append("method", "GET");
    data.append("atlas_id", currentAtlasIndex);
    sendData("land/land.php", data, loadMapLandDataCallback);

}

// Callback for the above script...
function loadMapLandDataCallback(data) {
    // Storing the data into our map variable...
    landJSON = JSON.parse(data);

    // Calling our function to finally display map data
    processMapLand();
}

// Handling getting all of the cities associated with this atlas
function loadAtlasCityData() {

    let data = new FormData();
    data.append("method", "GET");
    data.append("atlas_id", currentAtlasIndex);
    sendData("city/city.php", data, loadAtlasCityDataCallback);
}

function loadAtlasCityDataCallback(data) {
    // Loading city data
    cityJSON = JSON.parse(data);

    // Processing response data
    processMapCity();
}

function loadMapIcons() {

    let data = new FormData();
    data.append("method", "GET");
    sendData("icon/icon.php", data, loadMapIconsCallback);
}

function loadMapIconsCallback(data) {
    // Loading city data
    console.log("Got external data for icons");
    iconJSON = JSON.parse(data);
}

function loadMapLabels() {

    // Function for loading all of the terrain label data...
    let data = new FormData();
    data.append("method", "GET");
    data.append("atlas_id", currentAtlasIndex);

    sendData("label/label.php", data, loadLabelDataCallback);
}

function loadLabelDataCallback(data) {
    // Loading city data
    console.log("Got external data for labels");
    labelJSON = JSON.parse(data);

    processMapLabel();
}


function loadMapTerrainData() {

    // Function for loading all of the terrain map data...
    let data = new FormData();
    data.append("method", "GET");
    data.append("atlas_id", currentAtlasIndex);
    sendData("terrain/terrain.php", data, loadMapTerrainDataCallback);
}

function loadMapTerrainDataCallback(data) {
    // Loading terrain data
    terrainJSON = JSON.parse(data);

    // Processing the terrain data
    processMapTerrain();
}