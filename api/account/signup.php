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
    if($method == 'GET') {
        // RESTful API for getting data
        $password = hash('sha512',$data['password']);
        $email = $data['email'];

        // Checking if it already has an account
        $stmt_verify = $pdo->prepare("SELECT user_id FROM account_table WHERE email = :email");
        $stmt_verify->bindParam(':email',$email,PDO::PARAM_INT);
        $stmt_verify->execute();

        // Checking if more than one result
        $verify_results = $stmt_verify->fetchAll();
        if (sizeof($verify_results) > 0) {
            die("Error (Account already in use)");
        }

        // Generating the account
        include("../config/random.php");
        $account_key = generateRandomString(128);

        $stmt = $pdo->prepare("INSERT INTO account_table (email, password, init_date, account_key) VALUES (:email, :password, NOW(), :account_key)");
        $stmt->bindParam(':email',$email,PDO::PARAM_STR);
        $stmt->bindParam(':password',$password,PDO::PARAM_STR);
        $stmt->bindParam(':account_key',$account_key,PDO::PARAM_STR);
        $stmt->execute();

        // Creating the output data
        $myOutput->key = $account_key;
        $myOutput->id = $pdo->lastInsertId();
        $myOutput->email = $email;

        print_r(json_encode($myOutput));
        die();
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
