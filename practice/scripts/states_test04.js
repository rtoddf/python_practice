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
    this.get = function(){
        vis = d3.select('#example').append('svg')
            .attr({
                'width': width + margins.left + margins.right,
                'height': height + margins.top + margins.bottom,
                'preserveAspectRatio': 'xMinYMid',
                'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
            })

        vis_group = vis.append('g')

        var projection = d3.geo.conicConformal()
            // .parallels([ 40 + 26 / 60, 41 + 42 / 60 ])
            .rotate([ 82 + 30 / 60, -39 - 40 / 60 ])
            .translate([ 0, 0 ])

        var path = d3.geo.path()
            .projection(projection)

        projection
            .scale(100)

        queue()
            .defer(d3.json, "../../../data/states/ga-districts.json")
            .await(ready);

            function ready(error, ga){
                console.log('ga: ', ga)
                var gam = ga.objects
                console.log('gam: ', gam)

                vis.append('path')
                    .datum(topojson.feature(ga, ga))
                    .attr({
                        'd': path
                    })
                

                // var ga = us.objects.districts.geometries.filter(function(d){
                //     if(parseInt(d.id * .01) == 13){
                //         return d
                //     }
                // })

                // console.log('ga: ', ga)

                // vis_group.append('path')
                //     .datum(topojson.mesh(us, us.objects.districts))
                //         // .enter().append('path')
                    // .attr({
                    //     'class': 'county',
                    //     'd': path,
                    //     'fill': defaults.counties.fill,
                    //     'stroke': defaults.counties.stroke,
                    //     'stroke-width': defaults.counties.strokeWidth
                    // })
            }
    }
}

Map.get('ga')