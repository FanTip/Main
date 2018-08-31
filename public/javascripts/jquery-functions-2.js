$(function(){
    $('#login-form').on('submit', function(event){
        event.preventDefault();
        console.log('came here');
        var csrf = $('#_csrf').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var data = {
            _csrf : csrf,
            email : email,
            password : password
        }
        console.log(data);
        var xhr = $.ajax({
            type : 'POST',
            crossDomain : false,
            data : data,
            url : '/login'
        });
        xhr.done(function(response){
            toastr.success('Logged in successfully!');
            $(location).attr('href', '/profile');
            console.log(response);
        }).fail(function(response){
            console.log(response);
            toastr.error('Check your yousername/password again!');
        });

        console.log(xhr);
    });
});