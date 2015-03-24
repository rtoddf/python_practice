var container_parent = $('.display'),
	chart_container = $('#example'),
	margins = {top: 250, right: 480, bottom: 350, left: 480},
	// width = container_parent.width() - margins.left - margins.right,
	// height = (width * 0.3) - margins.top - margins.bottom,
	vis, vis_group, aspect

var radius = Math.min(margins.top, margins.right, margins.bottom, margins.left) - 10

var hue = d3.scale.category20()

var luminance = d3.scale.sqrt()
	.domain([ 0, 1e6 ])
	.clamp(true)
	.range([ 90, 20 ])

var vis = d3.select('#example')
	.append('svg')
		.attr({
			'width': margins.left + margins.right,
			'height': margins.top + margins.bottom
		})

var vis_group = vis.append('g')
	.attr({
		'transform': 'translate(' + margins.left + ', ' + margins.top + ')'
	})

var partition = d3.layout.partition()
	.sort(function(a, b){
		return d3.ascending(a.name, b.name)
	})
	.size([ 2 * Math.PI, radius ])

var arc = d3.svg.arc()
	.startAngle(function(d){
		return d.x
	})
	.endAngle(function(d){
		return d.x + d.dx - .01 / (d.depth + 5)
	})
	.innerRadius(function(d){
		return radius / 3 * d.depth
	})
	.outerRadius(function(d){
		return radius / 3 * (d.depth + 1) - 1
	})

d3.json('../data/flare.json', function(error, root){
	console.log('root: ', root)

	// Compute the initial layout on the entire tree to sum sizes.
	// Also compute the full name and fill color for each node,
	// and stash the children so they can be restored as we descend.
	partition
		.value(function(d){
			return d.size
		})
		.nodes(root)
		.forEach(function(d){
			d._children = d.children
			d.sum = d.value
			d.key = key(d)
			d.fill = fill(d)
		})

	// Now redefine the value function to use the previously-computed sum.
	partition
		.children(function(d, depth){
			return depth < 2 ? d._children : null
		})
		.value(function(d){
			return d.sum
		})

	var center  = vis_group
		.append('circle')
		.attr({
			'r': radius / 3
		})
		// .on('click', zoomOut)

	center
		.append('title')
		.text('zoom out')

	var path = vis_group.selectAll('path')
		.data(partition.nodes(root).slice(1))
			.enter().append('path')
		.attr({
			'd': arc,
			'fill': function(d){
				return d.fill
			}
		})
		.each(function(d){
			this._current = updateArc(d)
		})
		// .on('click', zoomIn)

})

function key(d){
	var k = []
		p = d
	while (p.depth) k.push(p.name), p = p.parent
	return k.reverse().join('.')
}

function fill(d){
	var p = d
	while (p.depth > 1) p = p.parent
	var c = d3.lab(hue(p.name))
	c.l = luminance(d.sum)
	return c
}

function updateArc(d) {
	return { 
		depth: d.depth,
		x: d.x,
		dx: d.dx
	}
}

































