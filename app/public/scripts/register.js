
yesImage = "url('http://note-to-myself.com/validYes.png')"
noImage = "url('http://note-to-myself.com/validNo.png')"
$(document).ready(function () {

    document.forms[0].email.select();

    error = false;
    errorMsg = $('.errorMsg');

    errorMsg.hide();

    $("#submit").click(function (e) {
        e.preventDefault();
        resetFields();
        var emptyfields = $("#email, #password, #passwordConfirm");
        emptyfields.each(function () {
            if ($(this).val() === "") {
                error = true;
                $(this).stop()
                    .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                    .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                    .animate({ left: "0px" }, 100)
                    .addClass("required");
            }
        });
        errorMsg.text("*** Missing required fields");

        validatePassword()
        validatePasswordConfirm()

        if (error) {
            e.preventDefault();
            errorMsg.show()
        } else {
            errorMsg.hide()
        }

        error = false;
    });

    // give immediate email validation feedback
    $("#email").keyup(function () {
        var email = $("#email").val();
        if (email != 0) {
            if (isValidEmailAddress(email)) {
                $("#validEmail").css({
                    "background-image": "url('http://note-to-myself.com/validYes.png')"
                });
            } else {
                $("#validEmail").css({
                    "background-image": "url('http://note-to-myself.com/validNo.png')"
                });
            }
        } else {
            $("#validEmail").css({
                "background-image": "none"
            });
        }
    });

    // give immediate email validation feedback
    $("#email").blur(function () {
        var email = $("#email").val();
        if (email != 0) {
            if (isValidEmailAddress(email)) {
                $("#validEmail").css({
                    "background-image": "url('http://note-to-myself.com/validYes.png')"
                });
            } else {
                $("#validEmail").css({
                    "background-image": "url('http://note-to-myself.com/validNo.png')"
                });
            }
        } else {
            $("#validEmail").css({
                "background-image": "none"
            });
        }
    });

    $("#password").keyup(function () {

        var validPass = $("#validPassword")
        var validPassConfirm = $("#validPassConfirm");
        var pass = $("#password").val();
        if (pass != 0) {
            // then check for a match here now too
            var passconf = $("#passwordConfirm").val();
            if ((passconf != 0) && (passconf.length >= 6)) {
                if (pass == passconf) {
                    validPass.css({ "background-image": "url('http://note-to-myself.com/validYes.png')" });
                    validPassConfirm.css({ "background-image": "url('http://note-to-myself.com/validYes.png')" });
                } else {
                    validPass.css({ "background-image": "url('http://note-to-myself.com/validNo.png)" });
                    validPassConfirm.css({ "background-image": "url('http://note-to-myself.com/validNo.png')" });
                }
            } else {

                if (pass.length >= 6) { // passconf has not been entered yet; ignore it here
                    validPass.css({
                        "background-image": "url('http://note-to-myself.com/validYes.png')"
                    });
                } else {
                    validPass.css({
                        "background-image": "url('http://note-to-myself.com/validNo.png')"
                    });
                }
            }
        } else {
            validPass.css({
                "background-image": "none"
            });
        }
    });

    // give immediate password-confirmation validation feedback
    $("#passwordConfirm").keyup(function () {
        var validPassConfirm = $("#validPassConfirm");
        var pass = $("#password").val();
        var pass_conf = $("#passwordConfirm").val();
        if (pass != 0) {
            if ((pass == pass_conf) && (pass_conf.length >= 6)) {
                validPassConfirm.css({ "background-image": yesImage });
            } else {
                validPassConfirm.css({ "background-image": noImage });
            }
        } else {
            validPassConfirm.css({
                "background-image": "none"
            });
        }
    });
});


function validatePassword() {
    var pass = $('#password');
    if (pass.val().length < 6) {
        pass.each(function () {
            $(this).stop()
                .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                .animate({ left: "0px" }, 100)
                .addClass("required");
        });

        if (error == false) {
            errorMsg.text("*** Password must be 6+ characters long");
            error = true;
        }
    }
}

function validatePasswordConfirm() {
    var password = $("#passwordConfirm");
    if (password.val() != $("#password").val()) {
        if (error == false) {
            errorMsg.text("*** Passwords do not match.");
            error = true;
        }

        password.each(function () {
            $(this).stop()
                .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                .animate({ left: "0px" }, 100)
                .addClass("required");
        });
    };
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/i);
    return pattern.test(emailAddress);
}

function resetFields() {
    error = false;
    $("input[type=text], input[type=password]").removeClass("required");
}