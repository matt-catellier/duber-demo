var Login = {
    error: false,
    test: function(msg) {
        alert(msg);
    },
    submit: function(formData) {
        var errorMsg = $('.errorMsg');
        this.resetFields();
        var emptyfields = $("#email, #password, #passwordConfirm");
        emptyfields.each(function () {
            if ($(this).val() === "") {
                this.error = true;
                $(this).stop()
                    .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                    .animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
                    .animate({ left: "0px" }, 100)
                    .addClass("required");
            }
        });
        if(this.error) {
            errorMsg.text("*** Missing required fields").fadeIn(1000);
            return;
        }
        this.error = isFormDataValid(formData);
        if (!this.error.dataIsValid) {
            errorMsg.text('*** ' + error.message).fadeIn(1000);
            return;
        } else {
            errorMsg.hide()
        }
        this.error = false;
        // do ajax so can post data after..??
        $.ajax({
            url : "/api/login",
            type: "POST",
            data : formData,
            success: function(res)
            {
                if(!res.success) {
                    errorMsg.text('*** ' + res.message).fadeIn(1000);
                } else {
                    window.location.href = res.url;
                }
            },
            error: function (err){ console.log(err) }
        });
    },
    resetFields: function() {
        error = false;
        $("input[type=text], input[type=password]").removeClass("required");
    },

    
}


function isFormDataValid(formData) {
    var dataIsValid = true;
    var message = "";
    $('.errorMsg').hide();
    if(dataIsValid == true)
        {
            if(!isValidEmailAddress(formData.email)){
                dataIsValid = false;   
                message = "Invalid email address: " + formData.email;
            }
        }
    var password = formData.password; 
    if (dataIsValid == true) {
        if (password.length < 1) {
            dataIsValid = false;
            message = "Password missing";
        }
    }
    if (dataIsValid == true) {
        if (password.length < 6) {
            dataIsValid = false;
            message = "Password too short";
        }
    }
    if (dataIsValid == true) {
        if (password.indexOf('<') != -1) {
            dataIsValid = false;
            message = "Illegal character in password";
        }
    }
    if (dataIsValid == true) {
        if (password.indexOf('>') != -1) {
            dataIsValid = false;
            message = "Illegal character in password";
        }
    }
    return {
        'dataIsValid': dataIsValid,
        'message': message
    } 
}  

function isValidEmailAddress(email) {
    var pattern = new RegExp(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/i);
    return pattern.test(email);
}     





module.exports = Login;