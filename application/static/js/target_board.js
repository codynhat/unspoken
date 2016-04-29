/* Target Board */

var width = $("div.board").width() * 0.9;
var height = 330;

var started = false;

var years = ["2013", "2014", "2015", "2016"];
var ts = [41, 68, 64, 14];
for (var j = 0; j < years.length; j++){
  var year = years[j];
  var svg = d3.select("#board-"+year).append("svg")
    .attr("width", '100%')
    .attr("height", height);

  var g = svg.append("g");

  var img = g.append("svg:image")
      .attr("xlink:href", "/static/img/target_board.svg")
      .attr("width", width)
      .attr("height", height)
      .attr("x", '50%')
      .attr("y", '50%')
      .attr("transform", 'translate(-'+ width/2 + ',-' + height/2 + ')');


  var g2 = g.append("g").attr('id', 'g2-'+j);
  d3.select("#board-"+year).append("h2").attr('class', 'board-year').text(year).attr('style', 'font-size: 1.5em;color:black');
  d3.select("#board-"+year).append("h2").attr('class', 'board-year').attr('id', 'num-'+year).attr('style', 'font-size: 2em');
}

function showBullets(){
  started = true;
  for (var j = 0; j < years.length; j++){
    var year = years[j];
    var t = ts[j];
    var g2 = d3.select('#g2-'+j);
    d3.select('#num-'+year).text("");
    g2.selectAll("*").remove();
    for(var i = 0; i < t; i += 1){
      var minx = -((width/2)/t)*i*1.5 + (width/2);
      var maxx = ((width/2)/t)*i*1.5 + (width/3);
      var miny = -((height/2)/t)*i*1.5 + (height/2);
      var maxy = ((height/2)/t)*i*1.5 + (height/3);

      var x = Math.floor((Math.random() * maxx) + minx);
      var y = Math.floor((Math.random() * maxy) + miny);
      g2.append("svg:image")
          .attr("xlink:href", "/static/img/bullet_hole.svg")
          .attr("width", 40)
          .attr("height", 40)
          .attr("x", x)
          .attr("y", y)
          .style("visibility", "hidden")
          .transition()
          .delay((Math.log(i+10)-1)*1800 - 2000)
          .style("visibility", "visible");
      d3.select('#num-'+year)
          .transition()
          .delay((Math.log(i+10)-1)*1800 - 2000)
          .text(i+1);
    }
  }
  setTimeout(showBullets, 5000);
}

$(window).scroll(function(){
  if($(window).scrollTop() > $("#target-trigger").position().top && started == false){
    showBullets();
  }
});
