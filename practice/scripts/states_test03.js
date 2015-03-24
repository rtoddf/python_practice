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
		stroke: '#000',
		strokeWidth: 1
	}
}

var projection = d3.geo.conicConformal()
	.rotate([ 82 + 30 / 60, -39 - 40 / 60 ])
	.translate([ width / 2, height / 2 ])

var path = d3.geo.path()
	.projection(projection)

var Map = new function(){
	this.get = function(state){
		$('#example').html('')
		vis = d3.select('#example').append('svg')
			.attr({
				'width': width + margins.left + margins.right,
				'height': height + margins.top + margins.bottom,
				'preserveAspectRatio': 'xMinYMid',
				'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
			})

		vis_group = vis.append('g')
		aspect = chart_container.width() / chart_container.height()

		queue()
			.defer(d3.json, '../../../data/states/us-named-parties.json')
			.defer(d3.json, "../../../data/states/us-congress-113.json")
			.defer(d3.json, '../../../data/states/counties/' + state + '-counties.json')
			.await(ready);

		function ready(error, parties, congress, counties){
			console.log('parties: ', parties)
			console.log('congress: ', congress)
			console.log('counties: ', counties)
			var states = topojson.feature(parties, parties.objects.states).features
			var districts = topojson.feature(congress, congress.objects.districts).features

			var stateId = getStateId(state, function(stateId){
				var d = getStateDistricts(stateId, function(d){
					drawIt(counties, d, states, stateId)
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
				$.each(districts, function(i, district){
					var divide = parseInt(district.id / 100)
					if(divide == id){
						stateDistrics.push(district)
					}
				})
				callback(stateDistrics)
			}
		}

		function drawIt(counties, districts, states, stateId){
			projection
				.scale(1)
				.translate([ 0, 0 ])

			var bounds = path.bounds(topojson.feature(counties, counties.objects.states)),
				scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height),
				translate = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2]

			projection
				.scale(scale)
				.translate(translate)

			vis_group.selectAll('path')
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
				.append('title')
					.text(function(d) {
						return d.id;
					});
		}
	}
}

Map.get('ny')

$(window).on('resize', function() {
	var targetWidth = container_parent.width()
	vis.attr({
		'width': targetWidth,
		'height': Math.round(targetWidth / aspect)
	})
})
