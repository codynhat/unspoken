/* Bullets */

/* Layout initial positions. No more than 25 bullets. Same amount on each row. */
var row_width = $('#bullets').width();
var bullet_width = 38;
var bullets_per_row = Math.floor(row_width/38);
var num_rows = Math.floor(25/bullets_per_row);

function create_bullets(){
  $('.bullet-row').remove();
  $('#bullets').empty();
  row_width = $('#bullets').width();
  bullet_width = 38;
  bullets_per_row = Math.floor(row_width/38);
  num_rows = Math.floor(25/bullets_per_row);
  if(num_rows == 0){
    num_rows = 1;
  }

  /* Create bullets */
  var section = $("#data-vis-2 > .row");
  for(var i = 0; i < num_rows; i++){
    var row = $('<div>').attr("class", "col-xs-10 col-xs-offset-1 text-center bullet-row");
    if(i == 0){
      row = $('#bullets');
    }
    var py = 150*i;
    for(var a = 0; a < bullets_per_row; a++){
      var p = 40+(a*40);
      var n = (i*bullets_per_row) + a+1;
      var bullet = $('<img>').attr('id', 'bullet' + n).attr('class', 'bullet').attr('src', '/static/img/bullet.svg').attr('style', 'left:' + p + 'px; top:' + py + 'px');
      if(p > row_width){
        continue;
      }
      row.append(bullet);
    }
    if(i > 0){
      section.append(row);
    }
  }
}


$(window).resize(create_bullets);


$(window).scroll(function(){
  var offset = 100; // When bullets start
  var speed = 6.0;  // Speed of bullets

  for(var i = 0; i < num_rows; i++){
    var py = 150*i;
    for(var a = 0; a < bullets_per_row; a++){
      var n = (i*bullets_per_row) + a+1;
      if(n % 3 != 0){
        continue;
      }
      $("#bullet" + n).css({
          top: function(index, value) {
            var p = -($(window).scrollTop()-$("#bullet-trigger").position().top+180-(n*13.3)+offset) * speed;
            if(p > py){
              return py;
            }
            return p;
          }
      });
    }

  }

});

create_bullets();
