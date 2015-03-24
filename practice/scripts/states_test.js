// https://github.com/unitedstates/districts
// http://stackoverflow.com/questions/14565963/topojson-for-congressional-districts

var container_parent = $('.display') ,
	chart_container = $('#example'),
	margins = {top: 20, right: 20, bottom: 20, left: 20},
	width = container_parent.width() - margins.left - margins.right,
	height = (width * 0.7) - margins.top - margins.bottom,
	vis, vis_group, aspect

var defaults = {
	counties: {
		fill: '#adc7b0',
		over: '#fff',
		stroke: '#fff',
		strokeWidth: 1
	}
}

var Map = new function(){
	this.get = function(state){
		$('#example').html('')
		var projection = d3.geo.conicConformal()
			// .parallels([ 40 + 26 / 60, 41 + 42 / 60 ])
			.rotate([ 82 + 30 / 60, -39 - 40 / 60 ])
			.translate([ width / 2, height / 2 ])

		var path = d3.geo.path()
			.projection(projection)

		vis = d3.select('#example').append('svg')
			.attr({
				'width': width + margins.left + margins.right,
				'height': height + margins.top + margins.bottom,
				'preserveAspectRatio': 'xMinYMid',
				'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
			})

		vis02 = d3.select('#example02').append('svg')
			.attr({
				'width': width/2 + margins.left + margins.right,
				'height': height/2 + margins.top + margins.bottom,
				'preserveAspectRatio': 'xMinYMid',
				'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
			})

		vis_group = vis.append('g')
		vis_group02 = vis02.append('g')
		aspect = chart_container.width() / chart_container.height()

		queue()
			.defer(d3.json, "../../../data/states/us.json")
			.defer(d3.json, '../../../data/states/us-named-parties.json')
			.defer(d3.json, "../../../data/states/us-congress-113.json")
			.defer(d3.json, '../../../data/states/counties/' + state + '-counties.json')
			.await(ready);

		function ready(error, us, parties, congress, counties){
			console.log(parties)
			var states = topojson.feature(parties, parties.objects.states).features
			var districts = congress.objects.districts
			var theDistricts = topojson.feature(congress, districts).features

			var stateId = getStateId(state, function(stateId){
				var d = getStateDistricts(stateId, function(d){
					drawIt(counties, d, states, stateId)
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
				$.each(theDistricts, function(i, district){
					var divide = parseInt(district.id / 100)
					if(divide == id){
						stateDistrics.push(district)
					}
				})
				callback(stateDistrics)
			}
		}

		function drawIt(counties, districts, states, stateId){
			vis_group02.selectAll('path')
				.data(districts.filter(function(d){
					return d.id % 1000
				}))
					.enter().append('path')
				.attr({
					'class': 'county',
					'd': path,
					'fill': defaults.counties.fill,
					'stroke': defaults.counties.stroke,
					'stroke-width': defaults.counties.strokeWidth
				})
				.on('mouseover', function(){
					d3.select(this)
						.transition()
						.duration(500)
							.attr({
								'fill': defaults.counties.over
							})
				})
				.on('mouseout', function(){
					d3.select(this)
						.transition()
						.duration(500)
							.attr({
								'fill': defaults.counties.fill
							})
				})


			// var thisState = states.filter(function(d){
			// 	return d.id == stateId
			// 	// console.log('d: ', d)
			// })

			// console.log('thisState: ', topojson.feature(counties, counties.objects.counties))

			// vis_group02.append('path')
			// 	.datum(topojson.feature(counties, counties.objects.counties))
			// 		// .enter().append('path')
			// 	.attr({
			// 		'class': 'county',
			// 		'd': path,
			// 		'fill': defaults.counties.fill,
			// 		'stroke': 'red',
			// 		'stroke-width': 1
			// 	})
		}

		d3.json('../../../data/states/counties/' + state + '-counties.json', function(error, topology){
			console.log('topology: ', topology)
			var counties = topojson.feature(topology, topology.objects.states)
			console.log('counties: ', topology)

			projection
				.scale(1)
				.translate([ 0, 0 ])

			var bounds = path.bounds(counties),
				scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height),
				translate = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2]

			projection
				.scale(scale)
				.translate(translate)

			vis_group.selectAll('path')
				.data(counties.features.filter(function(d){
					return d.id % 1000
				}))
					.enter().append('path')
				.attr({
					'class': 'county',
					'd': path,
					'fill': defaults.counties.fill,
					'stroke': defaults.counties.stroke,
					'stroke-width': defaults.counties.strokeWidth
				})
				.on('mouseover', function(){
					d3.select(this)
						.transition()
						.duration(500)
							.attr({
								'fill': defaults.counties.over
							})
				})
				.on('mouseout', function(){
					d3.select(this)
						.transition()
						.duration(500)
							.attr({
								'fill': defaults.counties.fill
							})
				})
		})
	}
}

Map.get('ga')

$(window).on('resize', function() {
	var targetWidth = container_parent.width()
	vis.attr({
		'width': targetWidth,
		'height': Math.round(targetWidth / aspect)
	})
})
