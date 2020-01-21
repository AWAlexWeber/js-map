// Variable indiciating whether or not we have an active display
let active_display = false;
let active_display_div = null;
let current_type = "";
let timeout = null;

// Defining the display data variables
const displayFunctionMapping = {  "Land": getDisplayDataLand,
                                "City": getDisplayDataCity,
                                "Terrain": getDisplayDataTerrain,
                                "Labels": getDisplayDataLabel,
                                "settings": getDisplaySettings
};

// A bit of extra stuff to handle when we click off the view...
$(document).ready(function() {
    // Adding a handler for clicking on the map
    $("#map_main_holder").click(function() {
        if (clickHidesView) {
            clearVerticalDisplay();
        }
    });
});

// Function that will directly clear our vertical display
function clearVerticalDisplay() {
    if (!active_display) {
        return;
    }

    if (active_display_div === null) {
        active_display_div = $(".displaymenu_bottom");
        console.log(active_display_div);
    }

    active_display_div.addClass("hidden");

    // Removing all previous inner html
    timeout = setTimeout(function() {
        active_display_div.innerHTML = "";
        active_display_div.empty();
    }, 500);

    // Flipping active_display
    active_display = false;
}

// Default function for loading a vertical display
function vertical_display_load(type) {

    // Clearing previous timeout
    clearTimeout(timeout);

    // Checking if the type is different than the current type
    // If it is, we do NOT want to change the active_display
    // Check if we need to load the display into cache
    if (active_display_div === null) {
        active_display_div = $(".displaymenu_bottom");
        console.log(active_display_div);
    }

    // Lets load up the vertical display...
    if (active_display && type === current_type) {
        console.log("Hiding");
        active_display_div.addClass("hidden");

        // Removing all previous inner html
        timeout = setTimeout(function() {
            active_display_div.innerHTML = "";
            active_display_div.empty();
        }, 500);

        // Flipping active_display
        active_display = !active_display;
    }
    else if (!active_display || type !== current_type) {
        // Removing all other data
        active_display_div.innerHTML = "";
        active_display_div.empty();

        // Removing all other classes
        let classList = active_display_div[0].classList;

        // Specifically targeting those that are display settings
        for (let i = 0; i < classList.length; i++) {
            let currentClass = classList[i];

            if (currentClass.indexOf("display_") !== -1) {
                active_display_div.removeClass(currentClass);
            }
        }

        // All of the data appending goes here...

        // First we want to add the close options display container thingy whatever...
        let close_manager = $("<div class = 'displaymenu_close_bar robotoSlabLight'></div>");
        let close_x = $("<div class = 'displaymenu_closebar_x robotoSlabLight'>X</div>");
        let close_checkbox = $("<input type='checkbox' class = 'displaymenu_close_checkbox'><label for='checkbox' style = 'color: white;'>Close display when clicking out</label></input>");
        $(close_checkbox).prop('checked', clickHidesView);
        close_x.click(function() {
            active_display_div.addClass("hidden");

            // Removing all previous inner html
            timeout = setTimeout(function() {
                active_display_div.innerHTML = "";
                active_display_div.empty();
            }, 500);

            // Flipping active_display
            active_display = !active_display;
        });

        // Setting checkbox stuff
        close_checkbox.click(function() {
            let checkbox = $(".displaymenu_close_checkbox");
            $(checkbox).prop('checked', !clickHidesView);
            clickHidesView = !clickHidesView;
        });


        close_manager.append(close_x);
        close_manager.append(close_checkbox);
        active_display_div.append(close_manager);

        // Adding the title
        active_display_div.append("<div class = 'displaymenu_title robotoSlabLight'> Options for " + type +"</div>");

        // Appending options to display_list
        active_display_div.append(getDisplayData(type));

        // Final adjustments
        active_display_div.addClass("display_" + type);
        active_display_div.removeClass("hidden");

        // If we simply moved type around, lets indicate that
        if (!active_display && type !== current_type) {
            active_display = !active_display;
        }
        else if (!active_display) {
            active_display = true;
        }
    }
    current_type = type;
}

// Helper function for creating checkboxes within the display menu list
function createCheckbox(title, checkboxvalue, checkbox_class_specifyer, index, checked) {

    let checkedAdded = "";

    if (checked) {
        checkedAdded = "checked";
    }

    return $("<div class = 'displaymenu_list_item robotoSlabLight'><input "+checkedAdded+" index = '"+index+"' class = '"+checkbox_class_specifyer+" displaymenu_list_checkbox' type = 'checkbox' name = 'display_" + checkboxvalue +"' />"+title+"</div>");
}

// Wrapper function for getting display data back
// Mostly does a simple if statement block to do redirection out...
function getDisplayData(type) {
    console.log("Getting display data for " + type);
    return displayFunctionMapping[type];
}

function getDisplayTitle(title) {
    let displayTitle = $("<div class = 'display_inner_title robotoSlabLight'>"+title+"</div>");
    return displayTitle;
}

function getButton(title, functionToCall, customClass) {

    let button = $("<div class = 'button_display_inner robotoSlabLight "+customClass+"'>"+title+"</div>")
    button.click(function() {
        functionToCall();
    });
    return button;
}

function getDisplaySettings() {
    console.log("Getting land display data");
    let primaryList = $("<div class = 'displaymenu_list_container'></div>");

    let display_text_admin = "Toggle Admin (" + devEnabled + ")";
    let display_text_time = "Toggle Time (" + FORCE_TIME_DISPLAY_RESTRICTION + ")";
    let display_text_land = "Toggle Land (" + FORCE_LAND_DISPLAY_RESTRICTION + ")";

    let button = $("<button class = 'enable_creation_button'>" + display_text_admin + "</button>");
    button.click(function(e) {
       devEnabled = !devEnabled;
    });

    primaryList.append(button);

    let button_force_time_display = $("<button class = 'enable_creation_button'>" + display_text_time + "</button>");
    button_force_time_display.click(function(e) {
        FORCE_TIME_DISPLAY_RESTRICTION = !FORCE_TIME_DISPLAY_RESTRICTION;
    });

    primaryList.append(button_force_time_display);

    let button_force_land_display = $("<button class = 'enable_creation_button'>" + display_text_land + "</button>");
    button_force_land_display.click(function(e) {
        FORCE_LAND_DISPLAY_RESTRICTION = !FORCE_LAND_DISPLAY_RESTRICTION;
    });

    primaryList.append(button_force_land_display);

    let button_force_refersh = $("<button class = 'enable_creation_button'>Force Refersh</button>");
    button_force_refersh.click(function(e) {
        refreshDisplay();
    });

    primaryList.append(button_force_refersh);

    return primaryList;
}

// Function for getting the land data correctly...
function getDisplayDataLand() {
    console.log("Getting land display data");
    let primaryList = $("<div class = 'displaymenu_list_container'></div>");

    // Adding all / clear
    primaryList.append(getDisplayTitle("Master Buttons"));
    primaryList.append(getButton("Enable All", function() {showAllLand()}), "");
    primaryList.append(getButton("Disable All",function() {hideAllLand()}), "");


    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("Lands"));

    // Appending all of the terrain options here...
    for (entry in landJSON) {
        let entryTitle = landJSON[entry].title;
        let checkbox = createCheckbox(entryTitle, "land_"+entry, "land", entry, landEnabling[entry]);
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");

            console.log("Toggling terrain display for index of " + index);
            toggleLandDisplay(index);
        });


        primaryList.append(checkbox);
    }

    return primaryList;
}

// Helper functions for terrain
function isTerrainCategoryChecked(entryTitle) {

    for (terrain in terrainJSON) {
        let terrainCategory = terrainJSON[terrain]['type_category'].toLowerCase();

        // Checking if it matches
        entryTitle = entryTitle.toLowerCase();

        if (terrainCategory.indexOf(entryTitle) !== -1) {
            // Check if it is checked or not
            if (terrainEnabling[terrain] !== 1) {
                return 0;
            }
        }
    }

    return 1;
}

// Helper function for checking if any of the citys that are enabled are checked with a category
function isCityCategoryChecked(entryTitle) {

    for (city in cityJSON) {
        let cityCategory = cityJSON[city]['type_category'].toLowerCase();

        // Checking if it matches
        entryTitle = entryTitle.toLowerCase();

        if (cityCategory.indexOf(entryTitle) !== -1) {
            // Check if it is checked or not
            if (cityEnabling[city] !== 1) {
                return 0;
            }
        }
    }

    return 1;
}

// Function for getting the city information display data...
function getDisplayDataCity() {
    console.log("Getting city display data!");

    // First we will display all of the categories that we have available to us...
    let primaryList = $("<div class = 'displaymenu_list_container'></div>");

    // Adding all / clear
    primaryList.append(getDisplayTitle("Master Buttons"));
    primaryList.append(getButton("Enable All", function() {showAllCities()}, ""));
    primaryList.append(getButton("Disable All", function() {hideAllCities()}, ""));

    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By Category"));


    for (entry in atlasCategores['city']) {

        let entryTitle = atlasCategores['city'][entry];
        let checkbox = createCheckbox(entryTitle, "city_"+entry, "city", entryTitle, isCityCategoryChecked(entryTitle));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isCityCategoryChecked(index);

            toggleCityCategory(index, value);
        });


        primaryList.append(checkbox);
    }

    // Adding a breaker line
    // Now to add each city per land so we can manually disable / enable a specific land
    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By Land"));

    for (land in landJSON) {
        let entryTitle = landJSON[land]['title'];
        let landIndex = landJSON[land]['land_id'];

        let checkbox = createCheckbox(entryTitle, "city_land_"+land, "city_land", landIndex, isLandCityChecked(landIndex));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isLandCityChecked(index);

            toggleCityLand(index, value);
        });

        primaryList.append(checkbox);
    }

    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By City"));

    // Now going to append all cities
    for (cityIterator in cityEnabling) {
        let cityTitle = cityJSON[cityIterator]['title'];
        let cityIndex = cityJSON[cityIterator]['city_id'];

        let checkbox = createCheckbox(cityTitle, "city_indiv_"+cityIndex, "city_indiv", cityIterator, isCityChecked(cityIndex));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isCityChecked(index);

            toggleCityIndividualCheck(index, value);
        });

        primaryList.append(checkbox);
    }

    return primaryList;
}

function isTerrainChecked(index) {
    let terrainEnablingValue = terrainEnabling[index];

    // Cannot be simplified, 1 != true
    if (terrainEnablingValue === 1) {
        return true;
    }
    else {
        return false;
    }
}

function isCityChecked(index) {
    let cityEnablingValue = cityEnabling[index];

    // Cannot be simplified, 1 != true
    if (cityEnablingValue === 1) {
        return true;
    }
    else {
        return false;
    }
}

// Helper function for terrain
function isLandTerrainChecked(landIndex) {

    for (terrain in terrainJSON) {
        let terrainLandIndex = terrainJSON[terrain]['land_id'];

        if (landIndex === terrainLandIndex) {
            // Check if it is checked or not
            if (terrainEnabling[terrain] !== 1) {
                return 0;
            }
        }
    }

    return 1;
}

// Helper function telling us if a specific land has any cities checked on it
function isLandCityChecked(landIndex) {

    for (city in cityJSON) {
        let cityLandIndex = cityJSON[city]['land_id'];

        if (landIndex === cityLandIndex) {
            // Check if it is checked or not
            if (cityEnabling[city] !== 1) {
                return 0;
            }
        }
    }

    return 1;
}

// Function for updating land checkboxes
function updateLandCheckboxes() {
    let updateLand = $(".land.displaymenu_list_checkbox");

    for (let i = 0; i < updateLand.length; i++) {
        let checkBox = updateLand[i];
        let index = checkBox.getAttribute("index");

        if (landEnabling[index] === 1 || landEnabling[index]) {
            $(checkBox).prop('checked', true);
        }
        else {
            $(checkBox).prop('checked', false);
        }
    }
}

// Function for updating checkboxes
function updateTerrainCheckboxes() {

    let updateTerrainByCategory = $(".terrain.displaymenu_list_checkbox");
    let updateTerrainByLand = $(".terrain_land.displaymenu_list_checkbox");
    let updateTerrainByName = $(".terrain_indiv.displaymenu_list_checkbox");

    console.log(updateTerrainByCategory);

    for (let i = 0; i < updateTerrainByCategory.length; i++) {
        let checkBox = updateTerrainByCategory[i];

        let index = checkBox.getAttribute("index");
        let value = isTerrainCategoryChecked(index);

        if (value === 1)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    for (let i = 0; i < updateTerrainByLand.length; i++) {
        let checkBox = updateTerrainByLand[i];

        let index = checkBox.getAttribute("index");
        let value = isLandTerrainChecked(index);

        if (value === 1)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    for (let i = 0; i < updateTerrainByName.length; i++) {
        let checkBox = updateTerrainByName[i];

        let index = checkBox.getAttribute("index");
        let value = isTerrainChecked(index);

        if (value === 1 || value)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    refreshDisplay();
}

// Function for updating checkboxes
function updateCityCheckboxes() {

    let updateCityByCategory = $(".city.displaymenu_list_checkbox");
    let updateCityByLand = $(".city_land.displaymenu_list_checkbox");
    let updateCityByName = $(".city_indiv.displaymenu_list_checkbox");

    for (let i = 0; i < updateCityByCategory.length; i++) {
        let checkBox = updateCityByCategory[i];

        let index = checkBox.getAttribute("index");
        let value = isCityCategoryChecked(index);

        if (value === 1)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    for (let i = 0; i < updateCityByLand.length; i++) {
        let checkBox = updateCityByLand[i];

        let index = checkBox.getAttribute("index");
        let value = isLandCityChecked(index);

        if (value === 1)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    for (let i = 0; i < updateCityByName.length; i++) {
        let checkBox = updateCityByName[i];

        let index = checkBox.getAttribute("index");
        let value = isCityChecked(index);

        if (value === 1 || value)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    refreshDisplay();
}

// Function for updating checkboxes
function updateLabelCheckboxes() {

    let updateLabelByCategory = $(".label.displaymenu_list_checkbox");
    let updateLabelByLand = $(".label_land.displaymenu_list_checkbox");
    let updateLabelByName = $(".label_indiv.displaymenu_list_checkbox");

    for (let i = 0; i < updateLabelByCategory.length; i++) {
        let checkBox = updateLabelByCategory[i];

        let index = checkBox.getAttribute("index");
        let value = isLabelCategoryChecked(index);

        if (value === 1)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    for (let i = 0; i < updateLabelByLand.length; i++) {
        let checkBox = updateLabelByLand[i];

        let index = checkBox.getAttribute("index");
        let value = isLandLabelChecked(index);

        if (value === 1)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    for (let i = 0; i < updateLabelByName.length; i++) {
        let checkBox = updateLabelByName[i];

        let index = checkBox.getAttribute("index");
        let value = isLabelChecked(index);

        if (value === 1 || value)
            $(checkBox).prop('checked', true);
        else
            $(checkBox).prop('checked', false);
    }

    refreshDisplay();
}

// Helper function for checking if any of the citys that are enabled are checked with a category
function isLabelCategoryChecked(entryTitle) {

    for (label in labelJSON) {
        let labelCategory = labelJSON[label]['type_category'].toLowerCase();

        // Checking if it matches
        entryTitle = entryTitle.toLowerCase();

        if (labelCategory.indexOf(entryTitle) !== -1) {
            // Check if it is checked or not
            if (labelEnabling[label] !== 1) {
                return 0;
            }
        }
    }

    return 1;
}

// Helper function telling us if a specific land has any cities checked on it
function isLandLabelChecked(landIndex) {

    for (label in labelJSON) {
        let labelLandIndex = labelJSON[label]['land_id'];

        if (landIndex === labelLandIndex) {
            // Check if it is checked or not
            if (labelEnabling[label] !== 1) {
                return 0;
            }
        }
    }

    return 1;
}

function isLabelChecked(index) {
    let labelEnablingValue = labelEnabling[index];

    // Cannot be simplified, 1 != true
    if (labelEnablingValue === 1) {
        return true;
    }
    else {
        return false;
    }
}


function getDisplayDataLabel() {
    console.log("Getting display data (label)!");


    // First we will display all of the categories that we have available to us...
    let primaryList = $("<div class = 'displaymenu_list_container'></div>");

    // Adding all / clear
    primaryList.append(getDisplayTitle("Master Buttons"));
    primaryList.append(getButton("Enable All", function() {showAllLabels()}));
    primaryList.append(getButton("Disable All", function() {hideAllLabels()}, ""));

    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By Category"));


    for (entry in atlasCategores['label']) {

        let entryTitle = atlasCategores['label'][entry];
        let checkbox = createCheckbox(entryTitle, "label_"+entry, "label", entryTitle, isLabelCategoryChecked(entryTitle));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isLabelCategoryChecked(index);

            toggleLabelCategory(index, value);
        });


        primaryList.append(checkbox);
    }

    // Adding a breaker line
    // Now to add each city per land so we can manually disable / enable a specific land
    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By Land"));

    for (land in landJSON) {
        let entryTitle = landJSON[land]['title'];
        let landIndex = landJSON[land]['land_id'];

        let checkbox = createCheckbox(entryTitle, "label_land_"+land, "label_land", landIndex, isLandLabelChecked(landIndex));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isLandLabelChecked(index);

            toggleLabelLand(index, value);
        });

        primaryList.append(checkbox);
    }

    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By Label"));

    // Now going to append all cities
    for (labelIterator in labelEnabling) {
        let terrainTitle = labelJSON[labelIterator]['title'];
        let terrainIndex = labelJSON[labelIterator]['label_id'];

        let checkbox = createCheckbox(terrainTitle, "label_indiv_"+terrainIndex, "label_indiv", labelIterator, isLabelChecked(terrainIndex));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isLabelChecked(index);

            toggleLabelIndividualCheck(index, value);
        });

        primaryList.append(checkbox);
    }

    return primaryList;
}

function getDisplayDataTerrain() {
    console.log("Getting display data!");

    // First we will display all of the categories that we have available to us...
    let primaryList = $("<div class = 'displaymenu_list_container'></div>");

    // Adding all / clear
    primaryList.append(getDisplayTitle("Master Buttons"));
    primaryList.append(getButton("Enable All", function() {showAllTerrain()}));
    primaryList.append(getButton("Disable All", function() {hideAllTerrain()}, ""));

    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By Category"));


    for (entry in atlasCategores['terrain']) {

        let entryTitle = atlasCategores['terrain'][entry];
        let checkbox = createCheckbox(entryTitle, "terrain_"+entry, "terrain", entryTitle, isTerrainCategoryChecked(entryTitle));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isTerrainCategoryChecked(index);

            toggleTerrainCategory(index, value);
        });


        primaryList.append(checkbox);
    }

    // Adding a breaker line
    // Now to add each city per land so we can manually disable / enable a specific land
    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By Land"));

    for (land in landJSON) {
        let entryTitle = landJSON[land]['title'];
        let landIndex = landJSON[land]['land_id'];

        let checkbox = createCheckbox(entryTitle, "terrain_land_"+land, "terrain_land", landIndex, isLandTerrainChecked(landIndex));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isLandTerrainChecked(index);

            toggleTerrainLand(index, value);
        });

        primaryList.append(checkbox);
    }

    primaryList.append($("<div class = 'displaymenu_list_breaker'></div>"));
    primaryList.append(getDisplayTitle("By City"));

    // Now going to append all cities
    for (terrainIterator in terrainEnabling) {
        let terrainTitle = terrainJSON[terrainIterator]['title'];
        let terrainIndex = terrainJSON[terrainIterator]['terrain_id'];

        let checkbox = createCheckbox(terrainTitle, "terrain_indiv_"+terrainIndex, "terrain_indiv", terrainIterator, isTerrainChecked(terrainIndex));
        let checkboxForBinding = $(checkbox[0]["firstChild"]);

        checkboxForBinding.click(function() {
            // Appending the toggle function for this guy...
            let index = this.getAttribute("index");
            let value = isTerrainChecked(index);

            toggleTerrainIndividualCheck(index, value);
        });

        primaryList.append(checkbox);
    }

    return primaryList;
}