var template_raw = '<% for(var i=0; i< data.length; i++){ %> \
	<div class="col-md-3 politics"> \
		<div class="profile_card <%= data[i].party %>"> \
			<a href="senator.html?person=<%= data[i].shortname %>" data-person="<%= data[i].shortname %>"> \
				<div class="profile_banner" style="background-image: url(../../../images/politics/<%= type %>/<%= _(data[i].name).photo() %>.jpg); background-color: rgba(0,50,100,.5)"> \
					<img src="../../../images/sprites/<%= data[i].party %>.png" class="sprite" /> \
				</div> \
			</a> \
			<div class="profile_avatar"> \
				<a href="senator.html?person=<%= data[i].shortname %>"><img class="" src="../../../images/politics/<%= category %>/<%= _(data[i].name).photo() %>_avatar.jpg" alt="<%= data[i].name %>" title="<%= data[i].name %>" title="<%= data[i].name %>" /></a> \
			</div> \
			<div class="profile_detail"> \
				<h4><%= data[i].name %> - <%= _(data[i].state).uppercase() %></h4> \
				<ul class="list-unstyled"> \
					<li><strong>Birth Date: </strong><%= data[i].personalData[0].birthdate %></li> \
					<li><strong>Birth Place: </strong><%= data[i].personalData[0].birthplace %></li> \
					<li><strong>Region: </strong><%= _(data[i].region).capitalize() %></li> \
					<li><strong>Class: </strong><%= data[i].class %></li> \
					<li><%= data[i].contact[0].address %></li> \
					<li><%= data[i].contact[0].phone %></li> \
				</ul> \
			</div> \
			<div class="social_links"> \
				<% if(data[i].social[0].facebook !== ""){ %> \
					<a href="http://facebook.com/<%= data[i].social[0].facebook %>" target="_blank"><i class="fa fa-facebook"></i></a> \
				<% } %> \
				<% if(data[i].social[0].twitter !== ""){ %> \
					<a href="http://twitter.com/<%= data[i].social[0].twitter %>" target="_blank"><i class="fa fa-twitter"></i></a> \
				<% } %> \
				<% if(data[i].social[0].youtube !== ""){ %> \
					<a href="http://youtube.com/user/<%= data[i].social[0].youtube %>" target="_blank"><i class="fa fa-youtube"></i></a> \
				<% } %> \
				<% if(data[i].social[0].website !== ""){ %> \
					<a href="<%= data[i].website %>" target="_blank"><i class="fa fa-globe"></i></a> \
				<% } %> \
			</div> \
		</div> \
	</div> \
	<% if ((i + 1) % 4 === 0){ %> \
		<div class="clear_all"></div> \
	<% } %> \
<% } %>'