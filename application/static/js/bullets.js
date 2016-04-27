/* Bullets */

$('#bullets-background').height($('#data-vis-2').height()+80);

/* Layout initial positions. No more than 25 bullets. Same amount on each row. */
var row_width = $('#bullets').width();
var bullet_width = 38;
var bullets_per_row = Math.floor(row_width/38);
var num_rows = Math.floor(25/bullets_per_row);

function create_bullets(){
  $('.bullet-row').remove();
  $('#bullets').empty();
  $('#bullets').css('height', $('#data-vis-2').height()+100);
  row_width = $('#bullets').width();
  bullet_width = 75;

  // num_rows = Math.floor(25/bullets_per_row);
  // if(num_rows == 0){
  //   num_rows = 1;
  // }

  /* Create bullets */
  for(var i = 0; i < 10; i++){
    var c;
    if(i % 2 == 0){
      c = 40;
      bullets_per_row = Math.floor(row_width/75);
    }
    else{
      c = 40+(75/2);
      bullets_per_row = Math.floor(row_width/75) - 1;
    }
    var row = $('<div>').attr("class", 'bullet-row');
    var py = 150*i;
    for(var a = 0; a < bullets_per_row; a++){
      var p = c+(a*75);
      var n = (i*bullets_per_row) + a+1;
      var bullet = $('<img>').attr('id', 'bullet' + n).attr('class', 'bullet').attr('src', '/static/img/bullet.svg').attr('style', 'left:' + p + 'px; top:' + py + 'px');
      if(p > row_width){
        continue;
      }
      row.append(bullet);
    }
    $('#bullets').append(row);
  }
}


$(window).resize(create_bullets);


$(window).scroll(function(){
  var offset = $('#bullets').height(); // When bullets start

  for(var i = 0; i < 10; i++){
    for(var a = 0; a < bullets_per_row; a++){
      var n = (i*bullets_per_row) + a+1;
      if(n % 3 != 0){
        continue;
      }
      $("#bullet" + n).css({
          opacity: function(index, value) {
            var p = (-($(window).scrollTop()-$("#bullet-trigger").position().top+200)/offset) + (n*0.007);
            console.log(p);
            if(p > 0.5){
              p = 0.5;
            }
            return p;
          }
      });
    }

  }

  // var offset = 100; // When bullets start
  // var speed = 6.0;  // Speed of bullets
  //
  // for(var i = 0; i < num_rows; i++){
  //   var py = 150*i;
  //   for(var a = 0; a < bullets_per_row; a++){
  //     var n = (i*bullets_per_row) + a+1;
  //     if(n % 3 != 0){
  //       continue;
  //     }
  //     $("#bullet" + n).css({
  //         top: function(index, value) {
  //           var p = -($(window).scrollTop()-$("#bullet-trigger").position().top+180-(n*13.3)+offset) * speed;
  //           if(p > py){
  //             return py;
  //           }
  //           return p;
  //         }
  //     });
  //   }
  //
  // }

});

create_bullets();
