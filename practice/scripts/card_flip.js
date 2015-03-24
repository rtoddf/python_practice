function isDefined(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var Politician = function(desc){
	this.name = isDefined(desc.name)
	this.shortname = isDefined(desc.shortname)
	this.state = isDefined(desc.state)
	this.region = isDefined(desc.region)
	this.class = isDefined(desc.class)
	this.personalData = isDefined(desc.personal)
	this.party = isDefined(desc.party)
	this.contact = isDefined(desc.contact)
	this.social = isDefined(desc.social)
	this.facts = isDefined(desc.facts)
	this.district = isDefined(desc.district)
	this.committeeAssignments = isDefined(desc.committee_assignments)
	this.tookOffice = isDefined(desc.took_office)
}

var Cards = new function(){
	this.getData = function(type, state){
		politicians = []
		$.getJSON('../../../data/politics/' + type + '.json', function(data){
			$.each(data, function(i, pol){
				var politician = new Politician(pol)
				politicians.push(politician)
			})

			politicians = _.filter(politicians, function(pol){
				return pol.state == state;
			})

			politicians = _.sortBy(politicians, function(pol){
				return (pol.state).split(' ').pop()
			})

			Cards.render(type, politicians)
		})
	}

	this.render = function(type, politicians){
		var templateCompiled = _.template(templateRaw, {
			data: politicians,
			type: type
		})
		$('#cards').html(templateCompiled)

		$('.flip_it').click(function(){
			var card = $(this).closest('.card')
			card.toggleClass('flipped')
			if(card.css('z-index') == 0){
				card.css('z-index', 100)
			} else {
				card.css('z-index', 0)
			}
			return false
		})
	}
}

var templateRaw = '<% for(var i=0; i<data.length; i++){ %> \
	<% if ((i + 1) % 4 === 0){ %> \
		<div class="row"> \
	<% } %> \
	<div class="col-md-3 flip"> \
		<div class="card <%= data[i].party %>"> \
			<div class="face front"> \
				<div class="profile_inner">\
					<a href="../detail_politician.html?type=<%- type %>&amp;person=<%= data[i].shortname %>"> \
						<div class="profile_banner" style="background-image: url(../../../images/politics/<%- type %>/<%= _(data[i].name).photo() %>.jpg); background-color: rgba(0,50,100,.5)"> \
							<img src="../../../images/sprites/<%= data[i].party %>.png" class="sprite"> \
						</div> \
					</a> \
					<div class="profile_avatar"> \
						<a href="../detail_politician.html?type=<%- type %>&amp;person=<%= data[i].shortname %>"> \
							<img class="" src="../../../images/politics/<%- type %>/<%= _(data[i].name).photo() %>_avatar.jpg" alt="<%= data[i].name %>" title="<%= data[i].name %>"> \
						</a> \
					</div> \
					<div class="profile_detail"> \
						<h4><%= data[i].name %> - <%= _(data[i].state).uppercase() %></h4> \
						<ul class="list-unstyled"> \
							<li><%= _(data[i].party).capitalize() %> <%- _(type).convertTitle() %> - <%= _(data[i].region).capitalize() %></li> \
							<% if(type == "house"){ %><li><%= _(data[i].district).district() %></li><% } %> \
						</ul> \
					</div> \
				</div>\
				<footer class="flip_menu"> \
					<i class="flip_it fa fa-arrow-circle-left"></i> \
				</footer> \
			</div> \
			<div class="face back"> \
				<div class="profile_inner">\
					<% if(data[i].social[0].facebook !== ""){ %> \
						<div class="social_grid"> \
							<a href="http://facebook.com/<%= data[i].social[0].facebook %>" target="_blank"><i class="fa fa-facebook"></i></a> \
						</div> \
					<% } %> \
					<% if(data[i].social[0].twitter !== ""){ %> \
						<div class="social_grid"> \
							<a href="http://twitter.com/<%= data[i].social[0].twitter %>" target="_blank"><i class="fa fa-twitter"></i></a> \
						</div> \
					<% } %> \
					<% if(data[i].social[0].youtube !== ""){ %> \
						<div class="social_grid"> \
							<a href="http://youtube.com/user/<%= data[i].social[0].youtube %>" target="_blank"><i class="fa fa-youtube"></i></a> \
						</div> \
					<% } %> \
					<% if(data[i].social[0].website !== ""){ %> \
						<div class="social_grid"> \
							<a href="<%= data[i].social[0].website %>" target="_blank"><i class="fa fa-globe"></i></a> \
						</div> \
					<% } %> \
				</div>\
				<footer class="flip_menu"> \
					<i class="flip_it fa fa-arrow-circle-right"></i> \
				</footer> \
			</div>\
		</div> \
	</div> \
	<% if ((i + 1) % 4 === 0){ %> \
		</div> \
	<% } %> \
<% } %>'

Cards.getData('house', 'in')




