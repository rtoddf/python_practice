var width = 960,
	height = 600;

var projection = d3.geo.albersUsa()
	.scale(1280)
	.translate([width / 2, height / 2]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("#example").append("svg")
	.attr("width", width)
	.attr("height", height);

queue()
	.defer(d3.json, "../../../data/states/us.json")
	.defer(d3.json, "../../../data/states/us-congress-113.json")
	.await(ready);

function ready(error, us, congress) {
	console.log('us: ', us)
	console.log('congress: ', congress)

	if (error) return console.error(error);

	var districts = congress.objects.districts,
		neighbors = topojson.neighbors(districts.geometries);

	console.log('districts: ', districts)
	console.log('neighbors: ', neighbors)

	svg.append("defs").append("path")
		.attr("id", "land")
		.datum(topojson.feature(us, us.objects.land))
		.attr("d", path);



	// svg.append("clipPath")
	// 	.attr("id", "clip-land")
	// 		.append("use")
	// 			.attr("xlink:href", "#land");

	var district = svg.append("g")
		.attr("class", "land")
		// .attr("clip-path", "url(#clip-land)")
		.selectAll("path")
			.data(topojson.feature(congress, districts).features)
				.enter().append("path")
					.attr("d", path);

	district.append("title")
		.text(function(d) {
			return d.id
		});

	// district
	// 	.each(function(d, i){ 
	// 		d.neighbors = d3.selectAll(neighbors[i].map(function(j) {
	// 			return district[0][j];
	// 		}));
	// 	})
		// .on("mouseover", function(d) {
		// 	d.neighbors.classed("neighbor", true);
		// })
		// .on("mouseout", function(d) {
		// 	d.neighbors.classed("neighbor", false);
		// });

	svg.append("path")
		.attr("class", "border border--district")
		.datum(topojson.mesh(congress, congress.objects.districts, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
		.attr("d", path);

	svg.append("path")
		.attr("class", "border border--state")
		.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
		.attr("d", path);
}


















