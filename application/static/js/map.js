var Chart = (function(window,d3) {

  var svg, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path, margin = {}, width, height;

  d3.csv('data.csv', init); //load data, then initialize chart

  //called once the data is loaded
  function init(csv) {
    data = csv;

    //initialize scales
    xExtent = d3.extent(data, function(d,i) { return new Date(d.date) });
    yExtent = d3.extent(data, function(d,i) { return d.value });
    x = d3.time.scale().domain(xExtent);
    y = d3.scale.linear().domain(yExtent);

    //initialize axis
    xAxis = d3.svg.axis().orient('bottom');
    yAxis = d3.svg.axis().orient('left');

    //the path generator for the line chart
    line = d3.svg.line()
      .x(function(d) { return x(new Date(d.date)) })
      .y(function(d) { return y(d.value) });

    //initialize svg
    svg = d3.select('#chart').append('svg');
    chartWrapper = svg.append('g');
    path = chartWrapper.append('path').datum(data).classed('line', true);
    chartWrapper.append('g').classed('x axis', true);
    chartWrapper.append('g').classed('y axis', true);

    //render the chart
    render();
  }

  function render() {

    //get dimensions based on window size
    updateDimensions(window.innerWidth);

    //update x and y scales to new dimensions
    x.range([0, width]);
    y.range([height, 0]);

    //update svg elements to new dimensions
    svg
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);
    chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //update the axis and line
    xAxis.scale(x);
    yAxis.scale(y);

    svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.select('.y.axis')
      .call(yAxis);

    path.attr('d', line);
  }

  function updateDimensions(winWidth) {
    margin.top = 20;
    margin.right = 50;
    margin.left = 50;
    margin.bottom = 50;

    width = winWidth - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
  }

  return {
    render : render
  }

})(window,d3);




var width = 1000;
var height = 600;
var svg = d3.select( "#map" )
  .append( "svg" )
  .attr( "id", "svg-map" )
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


setData("/static/data/school_data");
d3.select("#school_button").on("click", function(){
  setData("/static/data/school_data");
  d3.select(this).attr('class', 'btn btn-primary');
  d3.select("#mass_button").attr('class', 'btn btn-default');
});

d3.select("#mass_button").on("click", function(){
  setData("/static/data/mass_data");
  d3.select(this).attr('class', 'btn btn-primary');
  d3.select("#school_button").attr('class', 'btn btn-default');
});
