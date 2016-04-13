/* Intro */

var rotating_words = ["Classroom", "Work Place", "Movie Theater", "Bank", "Mall", "Restaurant", "Concert Hall", "Miltary Base", "Bar", "Church", "Stadium", "Gym", "Coffee Shop"];

var rw_words = d3.select(".rw-words");
for(var i in rotating_words){
  rw_words.append('span').text(rotating_words[i].toUpperCase() + " ?")
          .style('animation-delay', i*2 + 's');
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
$('#btn-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=http%3A//www.unspoken.io');
$('#btn-twitter').attr('href', 'https://twitter.com/intent/tweet?text=message&url=http%3A//www.unspoken.io');


/* Petition Form */
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
  if(first_name.length == 0){
    valid = false;
    $('#first_name').attr('class', 'invalid');
  }
  if(last_name.length == 0){
    valid = false;
    $('#last_name').attr('class', 'invalid');
  }
  if(email.length == 0){
    valid = false;
    $('#email').attr('class', 'invalid');
  }

  if(valid == false){
    $('.status').show();
    return;
  }

  $.post("/_petition", { first_name: first_name, last_name: last_name, email: email, story: story})
    .done(function(data) {
      console.log(data);
      $('#sign').attr('class', 'btn btn-success').text('THANKS!');
      $("#first_name").prop('disabled', true);
      $("#last_name").prop('disabled', true);
      $("#email").prop('disabled', true);
      $("#story").prop('disabled', true);
      $('.hide').show();
    });

});
