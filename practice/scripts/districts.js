// http://bl.ocks.org/markmarkoh/6735160
// http://bl.ocks.org/mbostock/4657115
// http://bl.ocks.org/mbostock/8814734

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
	.defer(d3.json, '../../../data/states/us-named-parties.json')
	.defer(d3.json, "../../../data/states/us-congress-113.json")
	.await(ready);

function ready(error, us, parties, congress) {
	if (error) return console.error(error);

	var states = topojson.feature(parties, parties.objects.states).features
	var districts = congress.objects.districts
	var theDistricts = topojson.feature(congress, districts).features

	console.log('parties: ', parties)
	console.log('states: ', states)
	// console.log('theDistricts: ', theDistricts)

	var state = 'ga'
	var stateId = getStateId(state, function(stateId){
		console.log('stateId: ', stateId)
		var d = getStateDistricts(stateId, function(d){
			console.log('d: ', d)
			// send to the map drawing function
		})
	})
	
	function getStateId(myState, callback){
		$.each(states, function(i, s){
			if(s.properties.code.toLowerCase() == myState){
				callback(s.id)
			}
		})
	}

	function getStateDistricts(id, callback){
		var stateDistrics = []
		console.log('stateId: ', stateId)
		$.each(theDistricts, function(i, district){
			var divide = parseInt(district.id / 100)
			if(divide == id){
				stateDistrics.push(district)
			}
		})
		callback(stateDistrics)
	}
	console.log('stateId: ', stateId)

	// console.log('stateDistrics: ', stateDistrics.sort())
	// console.log('us: ', us)
	// console.log('congress: ', congress)
	// console.log('parties: ', parties)
	// console.log('states: ', topojson.feature(parties, parties.objects.states).features)
	// console.log('features: ', topojson.feature(congress, districts).features)

	svg.append("defs").append("path")
		.attr("id", "land")
		.datum(topojson.feature(us, us.objects.states))
		.attr("d", path);

	var district = svg.append('g')
		.attr({
			'class': 'land'
		})
		.selectAll('path')
			.data(topojson.feature(congress, districts).features)
				.enter().append('path')
					.attr({
						'd': path
					})

	district.append('title')
		.text(function(d){
			return d.id
		})

	svg.append('path')
		.datum(topojson.mesh(congress, congress.objects.districts, function(a, b) {
			return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0);
		}))
		.attr({
			'd': path,
			'class': 'border border--district'
		})

	svg.append("path")
		.datum(topojson.mesh(us, us.objects.states, function(a, b) {
			return a !== b
		}))
		.attr({
			'd': path,
			'class': 'border border--state'
		})

}


















