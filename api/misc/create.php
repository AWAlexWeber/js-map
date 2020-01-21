<?php

    // Base PHP File for creating a miscellanious object...

    ////////////////////////////////////////////////////////////////////////////                                                                                                                                                             /////
    //                      Data Handling Boiler Plate                                                                                                                                                                                          //
    ////////////////////////////////////////////////////////////////////////////                                                                                                                                                             /////

    if ($_SERVER['REQUEST_METHOD'] !== "POST") {
        die("Error (Status Code 19)");
    }

    // First we have to get our request data
    $data = file_get_contents('php://input');
    $data = json_decode($data, TRUE);

    // Now grabbing our request type
    $method = $data['method'];

    if ($method === null) {
            $method = $_POST['method'];
    }

    // RESTful API for handling all information regarding accounts
    // This account api will return data regarding our users

    // Constructing the MySQL PDO
    // die("ERROR: Please update MySQL Database pointer");

    // TODO: Replace $pdo with new database
    // $pdo = new PDO('mysql:dbname=db_user;host=localhost;charset=utf8', '###LOAD_ACCOUNT_FROM_ENV_VAR###'
    $pdo = new PDO('mysql:dbname=dndmap;host=localhost;charset=utf8', '###LOAD_ACCOUNT_FROM_ENV_VAR###', '###LOAD_FROM_ENV_VAR###');

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    // Loading the GET request, only valid type
    if ($method == 'POST') {
        // RESTful API for posting data
        // Getting our type category to determine if it is a terrain or city...
        // Everything else will work just fine however...

        // First, authenticating the user...
        include("../config/auth.php");
        $auth_result = auth_user($data['user_id'], $data['account_key']);

        if (!$auth_result) {
            // Failure!
            die("Error (Status Code 500)");
        }

        // Okay, lets check the type category for the info we need...
        $type_category = $data['type_category'];
        $position_x = $data['x'];
        $position_y = $data['y'];

        // Adjusting Y
        $position_y = 6923 - $position_y;

        $title = $data['title'];
        $atlas_id = $data['atlas_id'];
        $land_id = $data['land_id'];

        // Building the land set
        $start_date = $data['creation_date'];
        $end_date = $data['destruction_date'];
        $time_set = "[[".$start_date.",".$end_date."]]";

        // Determining the icon id
        $stmt_icon = $pdo->prepare("SELECT id FROM ico_table WHERE default_type = :type");
        $stmt_icon->bindParam(':type', $data['type'], PDO::PARAM_STR);
        $stmt_icon->execute();

        $icon_id = $stmt_icon->fetchAll()[0]['id'];

        if (strpos($type_category, "terrain") !== false) {
            // We are generating into the terrain database!
            $stmt_insert = $pdo->prepare("INSERT INTO terrain_table (position_x, position_y, title, type_category, icon, atlas_id, land_id, time_set) VALUES (:x, :y, :title, :type_cat, :ico, :atlas, :land, :timeset)");
            $stmt_insert->bindParam(':x',$position_x,PDO::PARAM_INT);
            $stmt_insert->bindParam(':y',$position_y,PDO::PARAM_INT);
            $stmt_insert->bindParam(':title',$title,PDO::PARAM_STR);
            $stmt_insert->bindParam(':type_cat',$type_category,PDO::PARAM_STR);
            $stmt_insert->bindParam(':ico',$icon_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':atlas',$atlas_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':land',$land_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':timeset',$time_set,PDO::PARAM_STR);

            $stmt_insert->execute();
            die("Success!");

        }
        else if (strpos($type_category, "city") !== false) {
            // Generating into the city database!
            $stmt_insert = $pdo->prepare("INSERT INTO city_table (position_x, position_y, title, type_category, icon, atlas_id, land_id, time_set) VALUES (:x, :y, :title, :type_cat, :ico, :atlas, :land, :timeset)");
            $stmt_insert->bindParam(':x',$position_x,PDO::PARAM_INT);
            $stmt_insert->bindParam(':y',$position_y,PDO::PARAM_INT);
            $stmt_insert->bindParam(':title',$title,PDO::PARAM_STR);
            $stmt_insert->bindParam(':type_cat',$type_category,PDO::PARAM_STR);
            $stmt_insert->bindParam(':ico',$icon_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':atlas',$atlas_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':land',$land_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':timeset',$time_set,PDO::PARAM_STR);

            $stmt_insert->execute();
            die("Success!");
        }
        else if (strpos($type_category, "label") !== false) {
            // Generating into the city database!
            $stmt_insert = $pdo->prepare("INSERT INTO label_table (position_x, position_y, title, type_category, icon, atlas_id, land_id, time_set) VALUES (:x, :y, :title, :type_cat, :ico, :atlas, :land, :timeset)");
            $stmt_insert->bindParam(':x',$position_x,PDO::PARAM_INT);
            $stmt_insert->bindParam(':y',$position_y,PDO::PARAM_INT);
            $stmt_insert->bindParam(':title',$title,PDO::PARAM_STR);
            $stmt_insert->bindParam(':type_cat',$type_category,PDO::PARAM_STR);
            $stmt_insert->bindParam(':ico',$icon_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':atlas',$atlas_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':land',$land_id,PDO::PARAM_INT);
            $stmt_insert->bindParam(':timeset',$time_set,PDO::PARAM_STR);

            $stmt_insert->execute();
            die("Success!");
        }
        else {
            die("Error (Status Code 2555)");
        }
    }
    else {
        die("Error (Status Code 19)");
    }

?>
