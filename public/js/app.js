$(function(){
    // signupForm
    if($('#signupForm').length){
        $("#signupForm").validate({
            rules: {
                name: {
                    required: true,
                },
                username: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                },
                password_confirmation: {
                    required: true,
                },
            }
        });
    }

    // loginForm
    if($('#loginForm').length){
        $("#loginForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                }
            }
        });
    }

    // forgotForm
    if($('#forgotForm').length){
        $("#forgotForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                }
            }
        });
    }

    // resetForm
    if($('#resetForm').length){
        $("#resetForm").validate({
            rules: {
                password: {
                    required: true,
                },
                password_confirmation: {
                    required: true,
                },
            }
        });
    }

    // forgotForm
    if($('#verifyForm').length){
        $("#verifyForm").validate({
            rules: {
                login_otp: {
                    required: true,
                }
            }
        });
    }

});