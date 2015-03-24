function getTokens(){
    var tokens = [];            // new array to hold result
    var query = location.search; // everything from the '?' onward 
    query = query.slice(1);     // remove the first character, which will be the '?' 
    query = query.split('&');   // split via each '&', leaving us an array of something=something strings

    // iterate through each something=something string
    $.each(query, function(i,value){
        // split the something=something string via '=', creating an array containing the token name and data
        var token = value.split('=');
        // assign the first array element (the token name) to the 'key' variable
        var key = decodeURIComponent(token[0]);
        // assign the second array element (the token data) to the 'data' variable
        var data = decodeURIComponent(token[1]);
        tokens[key] = data;     // add an associative key/data pair to our result array, with key names being the URI token names
    });

    return tokens;  // return the array
}

var category,
	imagePath = '../../images/people/'

$(document).ready(function(){
	var tokens = getTokens()
	if(tokens['category'] == undefined){
		category = 'actors'
	} else {
		category = tokens['category']
	}
	People.get(category)
})

function isDefined(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var Person = function(desc){
	this.name = isDefined(desc.name)
	this.shortname = isDefined(desc.shortname)
	this.photo = isDefined(getPhoto(desc.name))
	this.birthdate = isDefined(desc.birthdate)
	this.birthplace = isDefined(desc.birthplace)
	this.facebook = isDefined(desc.social[0].facebook)
	this.twitter = isDefined(desc.social[0].twitter)
	this.youtube = isDefined(desc.social[0].youtube)
	this.instagram = isDefined(desc.social[0].instagram)
	this.tumblr = isDefined(desc.social[0].tumblr)
	this.website = isDefined(desc.social[0].website)
	this.type = isDefined(desc.type)
}

function getPhoto(name, type){
	var image_name = name.toLowerCase().replace(/ |\//g,'_').replace(/\(|\)|\.|\'|\,/g, '').replace('é', 'e').replace('ë', 'e') + '.jpg'
	return image_name
}

var People = new function(){
	this.get = function(cat){
		var people = []
		$.getJSON('../../../data/people/' + cat + '.json', function(data){
			console.log('data: ', data)
			$.each(data, function(i, p){
				var person = new Person(p)
				people.push(person)
			})

			people = _.sortBy(people, function(a){
				return (a.name).split(' ').pop()
			})

			console.log('people: ', people)

			People.render(people, cat)
		})
	}

	this.render = function(people, cat){
		console.log(people)
		var template_compiled = _.template(template_raw, {
			data: people,
			category: cat
		})
		$('#people').html(template_compiled)
	}
}

var template_raw = '<% for(var i=0; i<data.length; i++){ %> \
	<div class="col-md-4"> \
		<div class="profile_card <%= data[i].type[0] %>"> \
			<a href="person.html?person=<%= data[i].shortname %>&category=<%= data[i].type[0] %>" data-person="<%= data[i].shortname %>"> \
				<div class="profile_banner" style="background-image: url(../../../images/people/<%= category %>/<%= data[i].photo %>); background-color: rgba(0,50,100,.5)"></div> \
			</a> \
			<div class="profile_avatar"> \
				<a href="person.html?person=<%= data[i].shortname %>&category=<%= data[i].type[0] %>"><img class="" src="../../../images/people/<%= category %>/<%= _(data[i].name).photo() %>_avatar.jpg" alt="<%= data[i].name %>" title="<%= data[i].name %>" /></a> \
			</div> \
			<div class="profile_detail"> \
				<h4 class="<%= data[i].type %>"><%= data[i].name %><span class="type <%= data[i].type[1] %>">*</span></h4> \
				<ul class="list-unstyled"> \
					<li><strong>Birthdate: </strong><%= data[i].birthdate %></li> \
					<li><strong>Birthplace: </strong><%= data[i].birthplace %></li> \
				</ul> \
			</div> \
			<div class="social_links"> \
				<% if(data[i].facebook !== ""){ %> \
					<span><a href="http://www.facebook.com/<%= data[i].facebook %>" target="_blank"><i class="fa fa-facebook"></i></a></span> \
				<% } %> \
				<% if(data[i].twitter !== ""){ %> \
					<span><a href="http://www.twitter.com/<%= data[i].twitter %>" target="_blank"><i class="fa fa-twitter"></i></a></span> \
				<% } %> \
				<% if(data[i].instagram !== ""){ %> \
					<span><a href="http://www.instagram.com/<%= data[i].instagram %>" target="_blank"><i class="fa fa-instagram"></i></a></span> \
				<% } %> \
				<% if(data[i].youtube !== ""){ %> \
					<span><a href="http://www.youtube.com/user/<%= data[i].youtube %>" target="_blank"><i class="fa fa-youtube"></i></a></span> \
				<% } %> \
				<% if(data[i].tumblr !== ""){ %> \
					<span><a href="<%= data[i].tumblr %>" target="_blank"><i class="fa fa-tumblr"></i></a></span> \
				<% } %> \
				<% if(data[i].website !== ""){ %> \
					<span><a href="<%= data[i].website %>" target="_blank"><i class="fa fa-globe"></i></a></span> \
				<% } %> \
				<% if(data[i].facebook == "" && data[i].twitter == "" && data[i].instagram == "" && data[i].youtube == "" && data[i].tumblr == "" && data[i].website == ""){ %> \
					<span><a href="<%= data[i].website %>" target="_blank"><i class=""></i></a></span> \
				<% } %> \
			</div> \
		</div> \
	</div> \
	<% if ((i + 1) % 3 === 0){ %> \
		<div class="clear_all"></div> \
	<% } %> \
<% } %>'












