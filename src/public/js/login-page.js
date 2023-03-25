//  SHOW/HIDE PASSWORD

const showPassword = $('#showPassword');
const passwordField = $('.password');
showPassword.click(function() {
    if(passwordField.attr('type') === "password") {
        passwordField.attr('type', 'text')
        showPassword.addClass('fa-eye').removeClass('fa-eye-slash')
    } else {
        passwordField.attr('type', 'password')
        showPassword.addClass('fa-eye-slash').removeClass('fa-eye')
    }
})