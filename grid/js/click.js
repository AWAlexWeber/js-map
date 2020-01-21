let CLICK_MENU = null;
let RIGHT_CLICK_MENU = null;
let MOUSE_X = null;
let MOUSE_Y = null;
let devEnabled = true;

let BORDER_X_LEFT = 334;
let BORDER_X_RIGHT = 4670;
let BORDER_Y_BOTTOM = 334;
let BORDER_Y_TOP = 4670;
let GRID_SIZE = (BORDER_X_RIGHT - BORDER_X_LEFT) / 100;

function initMapClick() {

    map.on("click", function(e) {

        MOUSE_X = e.coordinate[0];
        MOUSE_Y = e.coordinate[1];

        if (devEnabled) {

            console.log("Clicked at ["+MOUSE_X+","+MOUSE_Y+"]");
        }

        // Within the correct X dimension
        if (MOUSE_X > BORDER_X_LEFT && MOUSE_X < BORDER_X_RIGHT) {
            if (MOUSE_Y > BORDER_Y_BOTTOM && MOUSE_Y < BORDER_Y_TOP) {
                if (devEnabled)
                    console.log("Clicked within grid!");

                // Determining the grid...
                // Getting grid relative position
                let relativeX = MOUSE_X - BORDER_X_LEFT;
                let relativeY = MOUSE_Y - BORDER_Y_BOTTOM;

                let gridX = Math.floor(relativeX / GRID_SIZE);
                let gridY = Math.floor(relativeY / GRID_SIZE);

                if (devEnabled)
                    console.log("Clicked grid position ["+gridX+","+gridY+"]");
            }
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

function processRightClick(evt) {
    evt.preventDefault();
}