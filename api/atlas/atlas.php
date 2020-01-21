<?php

    // Base PHP File for

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
    if($method == 'GET') {
        // RESTful API for getting data
        // Given a specific atlas ID, getting that atlas
        if ($data['atlas_id'] !== null) {
            $stmt_get_atlas = $pdo->prepare('SELECT * FROM atlas_table WHERE atlas_id = :atlas_id');
            $stmt_get_atlas->bindParam(':atlas_id', $data['atlas_id'], PDO::PARAM_INT);

            $stmt_get_atlas->execute();

            die(json_encode($stmt_get_atlas->fetchAll()));
        }

        else {
            $stmt_get_atlas = $pdo->prepare('SELECT * FROM atlas_table');

            $stmt_get_atlas->execute();

            die(json_encode($stmt_get_atlas->fetchAll()));
        }
    }
    else if ($method == 'PUT') {
        // RESTful API for putting data
    }
    else if ($method == 'DELETE') {
        // RESTful API for deleting data
    }
    else if ($method == 'POST') {
        // RESTful API for posting data
    }
    else {
        die("Error (Status Code 19)");
    }

?>
