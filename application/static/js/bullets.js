/* Bullets */

$('#bullets-background').height($('#data-vis-2').height()+80);

/* Layout initial positions. No more than 25 bullets. Same amount on each row. */
var row_width = $('#bullets').width();
var bullet_width = 38;
var bullets_per_row = Math.floor(row_width/38);

function create_bullets(){
  $('.bullet-row').remove();
  $('#bullets').empty();
  $('#bullets').css('height', $('#data-vis-2').height()+100);
  row_width = $('#bullets').width();
  bullet_width = 75;


  /* Create bullets */
  var n = 0;
  for(var i = 0; i < 6; i++){
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
      n += 1;
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
  if($(window).scrollTop() < $("#bullet-trigger").position().top-300 || $(window).scrollTop() > $("#bullet-trigger").position().top+300){
    return;
  }
  var offset = $('#bullets').height(); // When bullets start
  var n = 0;
  for(var i = 0; i < 10; i++){
    for(var a = 0; a < bullets_per_row; a++){
      n += 1;
      $("#bullet" + n).css({
          opacity: function(index, value) {
            if(n % 3 != 0){
              var p1 = 0.5-(($(window).scrollTop()-$("#bullet-trigger").position().top+50)/offset);
              if(p1 < 0.2){
                p1 = 0.2;
              }
              if(p1 > 0.5){
                p1 = 0.5;
              }
              return p1;
            }
            else{
              var p = (($(window).scrollTop()-$("#bullet-trigger").position().top+50)/offset) + 0.5;
              if(p < 0.5){
                p = 0.5;
              }
              return p;
            }

          }
      });
    }

  }

});

create_bullets();
