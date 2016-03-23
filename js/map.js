var width = 1000;
var height = 600;
var svg = d3.select( "#map" )
  .append( "svg" )
  .attr( "width", width )
  .attr( "height", height );

var g = svg.append( "g" );

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var geoPath = d3.geo.path()
    .projection( projection );

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
  .style("background-color", "white")
  .style("border", "1px solid black")
  .style("padding", "10px")
	.style("visibility", "hidden");

g.selectAll( "path" )
  .data( usa.features )
  .enter()
  .append( "path" )
  .attr( "fill", "#ccc" )
  .attr( "stroke", "#fff" )
  .attr( "d", geoPath );


function setData(data_file){
  d3.selectAll('text').remove();
  d3.csv(data_file+".csv")
    .row(function(d) {return d;})
    .get(function(error, rows) {
      var gg = g.selectAll("text").data(rows).enter();
          gg.append("text")
      		.attr("x", function (d) { return projection([d.long, d.lat])[0]-5; })
      		.attr("y", function (d) { return projection([d.long, d.lat])[1]; })
          .text("\uf041")
          .attr("class", "svg-icon")
          .attr("style", "stroke:#FFFFFF;stroke-width:1px")
          .on("mouseover", function(d){d3.select(this).style("cursor", "pointer").attr( "fill", "#FF3333" );return tooltip.html(d.NAME+"<br/>"+d.LOC+"<br/>"+d.DATE+"<br/>").style("visibility", "visible");})
          .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
          .on("mouseout", function(){d3.select(this).attr( "fill", "#000" ).style("cursor", "none");return tooltip.style("visibility", "hidden");})
          .attr( "fill", "#000" );
    });
}


setData("data/school_data");
d3.select("#school_button").on("click", function(){
  setData("data/school_data");
  d3.select(this).attr('class', 'btn btn-primary');
  d3.select("#mass_button").attr('class', 'btn btn-default');
});

d3.select("#mass_button").on("click", function(){
  setData("data/mass_data");
  d3.select(this).attr('class', 'btn btn-primary');
  d3.select("#school_button").attr('class', 'btn btn-default');
});
