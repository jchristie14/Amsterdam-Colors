"use strict";
(function(){

console.log("Linked!")



// $('#nightWatch').on('click',function(e){
//   e.preventDefault();

  $('body').on("click", "#submit", function(e){
    e.preventDefault();
    $('.pic').remove();
  var color = $('#search-type').val()
  var user = $('#userul').attr('data-id');
  console.log(user)

    $.ajax({
      'url':'http://localhost:3000/api/'+color,
      'method':'GET',
      'success':function(data){
        console.log(data)
        var results = data.artObjects;
        results.forEach(function(el){
          if (el.webImage === null){}
          else {
          var $picDiv = $('<a class="pic" href=selection/'+user+'/'+el.objectNumber+'><li></li></a>');
          var picture = (el.webImage.url);
          var $img = $('<img>')
          $img.attr("src", picture);
          $picDiv.attr("id", el.objectNumber)
          $picDiv.append($img);
          $('#userul').append($picDiv)
        }
      })
      }
});
});



  $('#addgall').on('click', function(e){
    e.preventDefault()
    var user_id=$('h1').attr('data-id');
    user_id=user_id.trim();
    user_id=Number(user_id)
    var picid =$('h1').attr('data-titl');
    picid=picid.trim();
    var picurl = $('img').attr('src');
    // picurl=picurl.trim();
    var hex1 = $('#1').attr('data-id');
    hex1=hex1.trim();
    var hex2 = $('#2').attr('data-id');
    var hex3 = $('#3').attr('data-id');
    var hex4 = $('#4').attr('data-id');
    var hex5 = $('#5').attr('data-id');
    var hex6 = $('#6').attr('data-id');
    var hex7 = $('#7').attr('data-id');
    var hex8 = $('#8').attr('data-id');
    var nGall ={'user_id':user_id,
                'picurl':picurl,
                'picid':picid,
                'hex1':hex1,
                'hex2':hex2,
                'hex3':hex3,
                'hex4':hex4,
                'hex5':hex5,
                'hex6':hex6,
                'hex7':hex7,
                'hex8':hex8}

    console.log(nGall);
    $.ajax({
      "url":"http://localhost:3000/ngall/"+user_id,
      "method":"POST",
      "data":nGall,
      "success": function(data){
        console.log('ajax call worked')
      }
    })
})



  $('.deletepicture').on('click',function(e){
    e.preventDefault()
    var picid = $(this).attr('data-id')
    var div = $(this).parent()
    console.log(picid+"$"+div)
    $.ajax({
      "url":"http://localhost:3000/delete/"+picid,
      "method":"DELETE",
      "success":function(){
        $(div).remove();
        console.log('done')
      }
    })
  })




})();
