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
