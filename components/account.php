<script src = "js/utilities/account.js"></script>
<link ref="stylesheet" href="css/account.css">

<div id="signup_modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="modal-title">Sign-up</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Account name or Email</label>
                        <input type="email" class="form-control" id="email_signup" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="password_signup" placeholder="Password">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id = "signup_button"type="button" data-backdrop="false" data-dismiss="modal" class="btn btn-primary">Sign-up</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div id="signin_modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="modal-title">Sign in</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Account name or Email</label>
                        <input type="email" class="form-control" id="email_signin" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="password_signin" placeholder="Password">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id = "signin_button" type="button"  data-backdrop="false" data-dismiss="modal" class="btn btn-primary">Sign-in</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>