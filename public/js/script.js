"use strict";
(function(){

console.log("Linked!")



// $('#nightWatch').on('click',function(e){
//   e.preventDefault();

  $('body').on("click", "#submit", function(e){
    e.preventDefault();
    $('li').remove();
  var color = $('#search-type').val()

    $.ajax({
      'url':'http://localhost:3000/api/'+color,
      'method':'GET',
      'success':function(data){
        console.log(data)
        var results = data.artObjects;
        results.forEach(function(el){
          if (el.webImage === null){}
          else {
          var $picDiv = $('<li>');
          var picture = (el.webImage.url);
          console.log()
          var $img = $('<img>')
          $img.attr("src", picture);
          $picDiv.attr("id", el.objectNumber)
          $picDiv.append($img);
          $('ul').append($picDiv)
        }
      })
      }
});

$('body').on("click", "#submit", function(e){
  e.preventDefault();
  $('li').remove();

})

});



// $.ajax({
//   "type":"GET",
//   "url":"",
//     "success":function(data){
//       console.log(data);
//       var picture = data.artObjects[0].webImage.url;
//       $('img').attr("src", picture);
//     };

// });


})();
