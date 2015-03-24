// http://socialinnovationsimulation.com/2013/07/11/tutorial-making-maps-on-d3/

var width = 960,
	height = 500

var projection = d3.geo.albersUsa()

var path = d3.geo.path()
	.projection(projection);

var vis = d3.select('#example').append('svg')
	.attr({
		'width': width,
		'height': height
	})

queue()
	.defer(d3.json, '../data/us-10m.json')
	.defer(d3.json, '../data/ga-districts.json')
	.defer(d3.json, '../data/us-congress-113.json')
	.await(ready);

function ready(error, us, ga, congress){
	console.log('us: ', us)
	console.log('ga: ', ga)
	console.log('congress: ', congress)

	// vis.selectAll('append')
	// 	.data(topojson.feature(us, us.objects.counties).features)
	// 		.enter().append('path')
	// 	.attr({
	// 		'd': path
	// 	})

	// vis.selectAll('append')
	// 	.data(topojson.feature(us, us.objects.states).features)
	// 		.enter().append('path')
	// 	.attr({
	// 		'd': path
	// 	})

	// vis.append('path')
 //      .attr('id', 'land')
 //      .datum(topojson.feature(us, us.objects.land))
 //      .attr('d', path);

 	vis.selectAll('append')
		.data(topojson.feature(congress, congress.objects.districts).features)
			.enter().append('path')
		.attr({
			'd': path,
			'class': 'house'
		})


	// this returns arcs
	var alaskaState = us.objects.states.geometries.filter(function(d){
		return d.id === 2
	})[0]

	var hawaiiState = us.objects.states.geometries.filter(function(d){
		return d.id === 15
	})[0]

	vis.append('path')
      .attr('id', 'land')
      .datum(topojson.feature(us, alaskaState))
      .attr('d', path);

	vis.append('path')
      .attr('id', 'land')
      .datum(topojson.feature(us, hawaiiState))
      .attr('d', path);
}