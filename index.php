<head>
    <!--- Loading CSS Stylesheets --->
    <!--- Loading the 'main' css for the home-page --->
    <link rel = "stylesheet" type="text/css" href="css/main.css" />
    <!--- Loading font css --->
    <link rel = "stylesheet" type="text/css" href="css/font.css" />
    <!--- Loading CSS for font-awesome --->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <!--- Loading the OL styles --->
    <link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.0.3/css/ol.css" type="text/css">
    <!--- Loading bootstra --->
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-theme.css">

    <!--- Loading some helper javascript --->
    <script src = "js/src/jquery-3.3.1.min.js"></script>
    <!--- Loading utilities --->
    <script src = "js/utilities/button.js"></script>
    <script src = "js/utilities/display.js"></script>
    <script src = "js/utilities/atlas.js"></script>
    <script src = "js/utilities/click_and_create.js"></script>
    <script src = "js/utilities/cookie.js"></script>
    <script src = "js/utilities/time.js"></script>
    <script src = "assets/bootstrap/js/bootstrap.js"></script>

    <!--- Loading OL scripts --->
    <script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.0.3/build/ol.js"></script>
</head>

<body>

    <?php

    // Loading the click popups
    include('components/click_menu.php');

    // Loading the top toolbar
    include('components/topbar.php');

    // Loading the 'main' map component
    include('components/map.php');

    // Loading the bottom navbar
    include('components/bottombar.php');

    // Loading the toolbar expanded views
    include('components/menu.php');

    // Loading the account management popups
    include('components/account.php');

    ?>

</body>