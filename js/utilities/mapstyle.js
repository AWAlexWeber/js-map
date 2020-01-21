// Helper function for dealing with loading of icons and stuff...
function getStyle(icon) {

    console.log("Checking style of " + icon);

    if (icon === 'ico_city_1.png') {
        return style_city_capital;
    }
    else if (icon === 'ico_city_2.png') {
        return style_city_greater;
    }
    else if (icon === 'ico_city_3.png') {
        return style_city_lesser;
    }
    else if (icon === 'ico_terrain.png') {
        console.log("Loading greater terrain style");
        return style_terrain;
    }
    else if (icon === 'ico_terrain_1.png') {
        console.log("Loading lesser terrain style");
        return style_terrain_lesser;
    }
}

// Loading stylesets for entire load

let style_terrain_lesser = new ol.style.Style({
    image: new ol.style.Icon(({
        src: 'MapFiles/Icons/ico_terrain.png',
        scale: 0.7
    }))
});


let style_terrain = new ol.style.Style({
    image: new ol.style.Icon(({
        src: 'MapFiles/Icons/ico_terrain.png',
        scale: 1.2
    }))
});

let style_city_capital = new ol.style.Style({
    image: new ol.style.Icon(({
        src: 'MapFiles/Icons/ico_city_1.png',
        scale: 1.2
    }))
});

let style_city_greater = new ol.style.Style({
    image: new ol.style.Icon(({
        src: 'MapFiles/Icons/ico_city_2.png',
        scale: 0.9
    }))
});

let style_city_lesser = new ol.style.Style({
    image: new ol.style.Icon(({
        src: 'MapFiles/Icons/ico_city_3.png',
        scale: 0.7
    }))
});

function adjustIconScale(scale) {

    if (scale === 1) {
        scaleNum = 0.3;
    }
    if (scale === 2) {
        scaleNum = 0.4;
    }
    if (scale === 3) {
        scaleNum = 0.6;
    }
    if (scale === 4) {
        scaleNum = 0.8;
    }
    if (scale === 5) {
        scaleNum = 1.2;
    }
    if (scale === 6) {
        scaleNum = 1.9;
    }
    if (scale === 7) {
        scaleNum = 3.5;
    }
    if (scale === 8) {
        scaleNum = 7;
    }
    if (scale === 9) {
        scaleNum = 11;
    }

    let scaleDat01 = 1.2 * scaleNum;
    let scaleDat02 = 0.7 * scaleNum;
    let scaleDat03 = 0.6 * scaleNum;

    style_terrain_lesser = new ol.style.Style({
        image: new ol.style.Icon(({
            src: 'MapFiles/Icons/ico_terrain.png',
            scale: scaleDat02
        }))
    });

    style_terrain = new ol.style.Style({
        image: new ol.style.Icon(({
            src: 'MapFiles/Icons/ico_terrain.png',
            scale: scaleDat01 * 2
        }))
    });

    style_city_capital = new ol.style.Style({
        image: new ol.style.Icon(({
            src: 'MapFiles/Icons/ico_city_1.png',
            scale: scaleDat01,
        }))
    });

    style_city_greater = new ol.style.Style({
        image: new ol.style.Icon(({
            src: 'MapFiles/Icons/ico_city_2.png',
            scale: scaleDat02
        }))
    });

    style_city_lesser = new ol.style.Style({
        image: new ol.style.Icon(({
            src: 'MapFiles/Icons/ico_city_3.png',
            scale: scaleDat03
        }))
    });

}

