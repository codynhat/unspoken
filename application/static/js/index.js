/* Intro */
var rotating_words = ["Classroom", "Work Place", "Movie Theater", "Bank", "Mall", "Restaurant", "Concert Hall", "Miltary Base", "Bar", "Church", "Stadium", "Gym", "Coffee Shop"];

var rw_words = d3.select(".rw-words");
for(var i in rotating_words){
  var v = (i*2)+1;
  rw_words.append('span').text(rotating_words[i].toUpperCase() + " ?")
          .style('animation-delay', v + 's');
}


$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});


/* Share buttons */
$('#btn-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=http%3A//www.unspoken.io&text=I have spoken my fear and requested mandated safety training @universityoforegon.');
$('#btn-twitter').attr('href', 'https://twitter.com/intent/tweet?url=http%3A//www.unspoken.io&text=I have spoken my fear and requested mandated safety training @universityoforegon.');


/* Petition Form */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$('.status').hide();

$('input').focus(function(){
  $(this).attr('class', '');
});

$("#sign").click(function(){
  var first_name = $('#first_name').val();
  var last_name = $('#last_name').val();
  var email = $('#email').val();
  var story = $('#story').val();
  var valid = true;


  if(email.length == 0 || validateEmail(email) == false){
    valid = false;
    $('#email').attr('class', 'invalid');
    $('.status').text("*Please enter a valid email").show();
  }
  if(last_name.length == 0 || last_name.length > 35){
    valid = false;
    $('#last_name').attr('class', 'invalid');
    $('.status').text("*Name and email are required").show();
  }
  if(first_name.length == 0 || first_name.length > 35){
    valid = false;
    $('#first_name').attr('class', 'invalid');
    $('.status').text("*Name and email are required").show();
  }

  if(valid == false){
    return;
  }

  $.post("/_petition", { first_name: first_name, last_name: last_name, email: email, story: story})
    .done(function(data) {
      $('#sign').text('THANKS!');
      $("#first_name").prop('disabled', true);
      $("#last_name").prop('disabled', true);
      $("#email").prop('disabled', true);
      $("#story").prop('disabled', true);
      $('.hide').show();
      load_signatures(data);
    });

});

function load_signatures(data) {
    $('#signatures').empty();
    $('#signatures').css('height', $('#petition').height()-100);
    var fonts = ['lamar-pen', 'american-scribe', 'lakeside'];
    var results = data["results"];
    var len = Math.min(results.length, 200);
    for(var i = 0; i < len; i++){
      var name = results[i];
      var font_i = Math.floor((Math.random() * fonts.length));
      var signature = $("<h2>").text(name).attr('class', 'signature').css('font-family', fonts[font_i]);
      $('#signatures').prepend(signature);
    }
}

$.get("/_petition").done(load_signatures);

/* Progress Bar */
$(window).scroll(function(){
  var progress = $(window).scrollTop()/($( document ).height()-$(window).height());
  var scroll_pos = progress * $('#progress-col').height()-$('#progress-bar').height();
  if(scroll_pos < 0){
    scroll_pos = 0;
  }
  $('#progress-bar').css('top',scroll_pos);
});
