// Implemetations for the creatorProfileCreate
Dropzone.autoDiscover = false; 
$(function(){
    $('#creator_profile_create').on('submit', function(event){
        event.preventDefault();
        var creator_name = $('#creator_name_create').val();
        
        console.log(creator_name);
    });

    var myDropzone = new Dropzone('#profileImageCanvas', {
        url : '/upload',
        thumbnailWidth : 80,
        thumbnailHeight : 80,
        autoQueue : false,
        previewTemplate : previewTemplate
    });

    myDropzone.on('addedfile', function(file){
        // file.previewElement.querySelector()
    });
    // myDropzone.on('dragover', function(file){
    //     alert(file);
    // });
    myDropzone.on('drop', function(files){
        files
        console.log(files);
    });
    myDropzone.on('click', function(){
        alert('clicked');
    });
    console.log(myDropzone);
    // $('#profileImageCanvas').dropzone({
    //     url : '/upload',
    //     method : 'POST',
    //     parallelUploads : 1,
    //     maxFiles : 1
    // });
  







});
