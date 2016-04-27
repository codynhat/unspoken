var Chart = (function(window,d3,data_file) {

  var data;

  d3.csv(data_file+".csv")
    .row(function(d) {return d;})
    .get(init);

  //called once the data is loaded
  function init(error, rows) {
    data = rows;

    render();
  }

  function render() {
    d3.select( "#map" ).selectAll("*").remove();

    var width =  $( "#map" ).width();
    var height =  0.75 * window.innerHeight;;
    var scale = 1000;

    var offset = [width/2, height/2];

    var svg = d3.select( "#map" )
      .append( "svg" )
      .attr( "id", "svg-map" )
      .attr( "width", "100%" )
      .attr( "height", height );

    var g = svg.append( "g" );

    var projection = d3.geo.albersUsa()
        .scale(scale)
        .translate(offset);

    var geoPath = d3.geo.path()
        .projection( projection );

    var bounds  = geoPath.bounds(usa);
    var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
    var vscale  = scale*(0.85*height) / (bounds[1][1] - bounds[0][1]);
    var scale   = (hscale < vscale) ? hscale : vscale;
    var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                      height - (bounds[0][1] + bounds[1][1])/2];

    projection = d3.geo.albersUsa()
        .scale(scale)
        .translate(offset);

    geoPath = d3.geo.path()
        .projection( projection );

    var tooltip = d3.select("body")
    	.append("div")
      .attr('id', 'tooltip')
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

    var gg = g.selectAll("text").data(data).enter();
        gg.append("text")
        .attr("x", function (d) { return projection([d.long, d.lat])[0]-5; })
        .attr("y", function (d) { return projection([d.long, d.lat])[1]; })
        .text("\uf041")
        .attr("class", "svg-icon")
        .attr("style", "stroke:#FFFFFF;stroke-width:1px")
        .on("mouseover", function(d){d3.select(this).style("cursor", "pointer").attr( "fill", "#FF3333" );return d3.select('#tooltip').html(d.NAME+"<br/>"+d.LOC+"<br/>"+d.DATE+"<br/>").style("visibility", "visible");})
        .on("mousemove", function(){return d3.select('#tooltip').style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){d3.select(this).attr( "fill", "#000" ).style("cursor", "none");return d3.select('#tooltip').style("visibility", "hidden");})
        .attr( "fill", "#000" );
  }

  return {
    render : render,
    init: init
  }

})(window,d3,"/static/data/school_data");


$(window).resize(Chart.render);

d3.select("#school_button").on("click", function(){
  d3.csv("/static/data/school_data.csv")
    .row(function(d) {return d;})
    .get(Chart.init);
  d3.select(this).attr('class', 'btn btn-custom');
  d3.select("#mass_button").attr('class', 'btn btn-default');
});

d3.select("#mass_button").on("click", function(){
  d3.csv("/static/data/mass_data.csv")
    .row(function(d) {return d;})
    .get(Chart.init);
  d3.select(this).attr('class', 'btn btn-custom');
  d3.select("#school_button").attr('class', 'btn btn-default');
});
