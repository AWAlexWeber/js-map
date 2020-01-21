<?php

    function auth_user($user_id, $account_key) {
        // Returning false on failure, true on success
        $pdo = new PDO('mysql:dbname=dndmap;host=localhost;charset=utf8', '###LOAD_ACCOUNT_FROM_ENV_VAR###', '###LOAD_FROM_ENV_VAR###');

        $stmt = $pdo->prepare('SELECT * FROM account_table WHERE account_key = :account_key AND user_id = :user_id');
        $stmt->bindParam(':account_key', $account_key, PDO::PARAM_INT);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll();
        $size = sizeof($result);

        if ($size <= 0)
            return false;


        return true;
    }

?>
