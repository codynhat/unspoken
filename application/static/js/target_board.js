/* Target Board */

var width = 500;
var height = 530;

var svg = d3.select("#board").append("svg")
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


var g2 = g.append("g");
d3.select("#board").append("h2").attr('id', 'board-year').attr('style', 'color:black');


var years = ["2013", "2014", "2015", "2016"];
var ts = [41, 68, 64, 14];
var j = 0;
var started = false;
function showYear(){
  started = true;
  var t = ts[j];
  d3.select("#board-year").text(years[j]);
  g2.selectAll("*").remove();
  for(var i = 0; i < t; i += 1){
    var minx = -(250/t)*i + 250; // 250 to 20
    var maxx = ((620-150)/t)*i + 150; // 150 to 620
    var miny = -(150/t)*i + 150; // 150 to 0
    var maxy = ((490-150)/t)*i + 150; // 150 to 490

    var x = Math.floor((Math.random() * maxx) + minx);
    var y = Math.floor((Math.random() * maxy) + miny);
    g2.append("svg:image")
        .attr("xlink:href", "/static/img/bullet_hole.svg")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", x)
        .attr("y", y)
        .style("visibility", "hidden")
        .transition()
        .delay(Math.log(i+10)*1000 - 2000)
        .style("visibility", "visible");
  }
  j = j + 1;
  if(j < ts.length){
    setTimeout(showYear, 3000);
  }
}

$(window).scroll(function(){
  if($(window).scrollTop() > $("#data-vis-3").position().top-100 && started == false){
    showYear();
  }
});
