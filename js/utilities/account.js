ACCOUNT_KEY = "";
ACCOUNT_ID = "";
ACCOUNT_NAME = "";


// Function for handling logging in
function logInAccount(ACCOUNT_ID, ACCOUNT_KEY, ACCOUNT_NAME) {

    // Saving cookies and appending data objects
    setCookie("ACCOUNT_ID",ACCOUNT_ID,30);
    setCookie("ACCOUNT_KEY",ACCOUNT_KEY,30);
    setCookie("ACCOUNT_NAME",ACCOUNT_NAME,30);

    // Already have cookies saved!
    // Hiding the upper bar now...
    $("#sign-in_topbar").remove();
    $("#sign-up_topbar").remove();

    // Adding the user info spot
    let holder = $("#rightButtonHolder");
    let userHolder = $('<div unselectable="on" id = "sign-in_topbar" class = "navbar_button_obj jbutton unselectable"><i class="fas fa-user"></i><br>Welcome '+ACCOUNT_NAME+'!</div>');
    let logOut = $('<div unselectable="on" id = "log_out" class = "navbar_button_obj jbutton unselectable"><i class="fas fa-sign-out-alt"></i><br>Log Out</div>');

    logOut.click(function() {
        logOutAccount();
    });

    // Removing the blocker

    holder.append(userHolder);
    holder.append(logOut);
}

// Function for logging out and removing cookies
function logOutAccount() {
    console.log("logging out...");
    setCookie("ACCOUNT_ID","",0);
    setCookie("ACCOUNT_KEY","",0);
    setCookie("ACCOUNT_NAME","",0);
    location.reload();
}

$(document).ready(function() {

    // Checking if we already have an account saved...
    ACCOUNT_NAME = getCookie("ACCOUNT_NAME");
    ACCOUNT_ID = getCookie("ACCOUNT_ID");
    ACCOUNT_KEY = getCookie("ACCOUNT_KEY");

    if (ACCOUNT_NAME != null &&
        ACCOUNT_ID != null &&
        ACCOUNT_KEY != null
    ) {
        logInAccount(ACCOUNT_ID, ACCOUNT_KEY, ACCOUNT_NAME);
    }

    $("#sign-up_topbar").click(function() {
        $("#signup_modal").modal();
    });

    $("#sign-in_topbar").click(function() {
        $("#signin_modal").modal();
    });

    $("#signin_button").click(function() {
        let email_signin = $("#email_signin").val();
        let password_signin = $("#password_signin").val();

        console.log(email_signin+","+password_signin);

        let data = new FormData();
        data.append("method", "GET");
        data.append("email", email_signin);
        data.append("password", password_signin);
        sendData("account/signin.php",data,signin_callback);
    });

    $("#signup_button").click(function() {
        let email_signup = $("#email_signup").val();
        let password_signup = $("#password_signup").val();

        let data = new FormData();
        data.append("method", "GET");
        data.append("email", email_signup);
        data.append("password", password_signup);
        sendData("account/signup.php",data,signup_callback);
    });
});

function signin_callback(data) {
    if (data.indexOf("Error") !== -1) {
        console.log("Invalid account");
    }
    else {
        loadAccountLocal(data);
    }
}

function signup_callback(data) {
    if (data.indexOf("Error") !== -1) {
        console.log("Invalid account");
    }
    else {
        loadAccountLocal(data);
    }
}

function loadAccountLocal(data) {
    console.log(data);
    jsonData = JSON.parse(data);
    ACCOUNT_ID = jsonData['user_id'];
    ACCOUNT_KEY = jsonData['account_key'];
    ACCOUNT_NAME = jsonData['email'];

    logInAccount(ACCOUNT_ID, ACCOUNT_KEY, ACCOUNT_NAME);

    holder.append(userHolder);
    holder.append(logOut);
}