/*
    jquery functions to get the data from the index page in order to make the tipping 
*/
$(function () {
    $('#tipping-form').on('submit', function(event){
   
        event.preventDefault();
        var tipAmount = $('#tipamout').val();
        var csrf = $('#_csrf').val();
        var creatorEmail = $('#_creatorEmail').val();
        var message = $('#message').val();
        var email = $('#email').val();
        var data = {
            _tipamount : tipAmount,
            _creatorEmail : creatorEmail,
            _message : message,
            _csrf : csrf,
            _email : email
        }
        var xhr = $.ajax({
            type : 'POST',
            url : '/tipping/sendtip',
            crossDomain: false,
            data :  data,
            
        });
        
        xhr.done(function(response){
            toastr.success('Tipping Successful');

        }).fail(function(){
            toastr.error('Tipping Failed');
        });

    });
    $('#tiphistory').on('click', function(){
        var xhr = $.ajax({
            type : 'GET',
            url : '/fantiphistory',
            crossDomain : false
        });
        xhr.done(function(response){
            toastr.success(response);
        });
    });
  });
  