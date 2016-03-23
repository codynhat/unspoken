/* Intro */

var rotating_words = ["Classroom", "Work Place", "Movie Theater", "Bank", "Mall", "Restaurant", "Concert Hall", "Miltary Base", "Bar", "Church", "Stadium", "Gym", "Coffee Shop"];

var rw_words = d3.select(".rw-words");
for(var i in rotating_words){
  rw_words.append('span').text(rotating_words[i].toUpperCase() + " ?")
          .style('animation-delay', i*2 + 's');
}
