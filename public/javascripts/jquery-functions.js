$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
        toastr.error("cdfd");
    });
    $("#click").click( function(){
        toastr.info('ffff');
    });


    $('#error').click(function () {
        // make it not dissappear
        toastr.error("Noooo oo oo ooooo!!!", "Title", {
            "timeOut": "0",
            "extendedTImeout": "0"
        });
    });
    $('#info').click(function () {
       // title is optional
        toastr.info("Info Message", "Title");
    });
    $('#warning').click(function () {
        toastr.warning("Warning");
    });
    $('#success').click(function () {
        toastr.success("YYEESSSSSSS");
    });
});


$(function () {
    $('#tipping-form').on('submit', function(event){
        console.log('got here');
        event.preventDefault();
         var tipAmount = $('#tipamout');
         var data = 1;
        //  JSON.stringify({amount : tipAmount.val(), _csrf : $('#_csrf').val()});
         console.log(tipAmount.val(), $('#_csrf').val());
        var xhr = $.ajax({
            type : 'POST',
            url : './tipping',
            // crossDomain: false,
            data : data,
        });

        xhr.done(function(response){
            console.log(response);

        }).fail(function(){
            toastr.error('Tipping Failed');
        });

        var xhr1 = $.ajax({
            type : 'GET',
            url : './tipping',
            crossDomain : false,
            dataType : 'json',
            contentType : 'json',
            headers : {'api-key':'myKey'},
        });

        xhr1.done(function(response){
            console.log(response);
        }).fail(function(){
            toastr.error('error loading data');
        })

        console.log(xhr);
        console.log(xhr1);
    });
  });
  