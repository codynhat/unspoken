/* Bullets */

/* Layout initial positions. No more than 27 bullets. Same amount on each row. */

var section = $("#data-vis-2 > .row");
var row = $('<div>').attr("class", "col-xs-10 col-xs-offset-1 text-center");

$(window).scroll(function(){
  var offset = -100;
  var speed = 10.0;
  $("#bullet3").css({
  		top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top+140+offset) * speed;
        if(p > 0){
          return 0;
        }
    		return p;
  		}
  });

  $("#bullet6").css({
      top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top+100+offset) * speed;
        if(p > 0){
          return 0;
        }
        return p;
      }
  });

  $("#bullet9").css({
      top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top+60+offset) * speed;
        if(p > 0){
          return 0;
        }
        return p;
      }
  });

  $("#bullet12").css({
      top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top+20+offset) * speed;
        if(p > 0){
          return 0;
        }
        return p;
      }
  });

  $("#bullet15").css({
      top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top-20+offset) * speed;
        if(p > 0){
          return 0;
        }
        return p;
      }
  });

  $("#bullet18").css({
      top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top-60+offset) * speed;
        if(p > 0){
          return 0;
        }
        return p;
      }
  });

  $("#bullet21").css({
      top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top-100+offset) * speed;
        if(p > 0){
          return 0;
        }
        return p;
      }
  });

  $("#bullet24").css({
      top: function(index, value) {
        var p = -($(window).scrollTop()-$("#data-vis-2").position().top-140+offset) * speed;
        if(p > 0){
          return 0;
        }
        return p;
      }
  });

});
