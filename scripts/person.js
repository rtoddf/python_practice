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

var person, personName, category, imagePath = '../../images/people/'
var tweet_limit = 10

$(document).ready(function(){
	var tokens = getTokens();

	person = tokens['person'],
	category = tokens['category'],
	imagePath = '../../images/people/'

	Person.get(person, category)
})

function isDefined(obj){
	return typeof(obj) !== 'undefined' && obj !== null ? obj : ''
}

var Person = new function(){
	this.get = function(shortname, category){
		var person = []
		$.getJSON('../../../data/people/' + category + '.json', function(data){
			data = _.sortBy(data, function(a){
				return (a.name).split(' ').pop()
			})

			person = _.filter(data, function(p){
				if (p.shortname == shortname){
					return p
				}
			})

			personName = person[0].name
			Person.render(person[0])
			
			if(person[0].social[0].twitter !== ''){
				Person.getTweets(person[0], category)
			}
			if(person[0].social[0].instagram !== ''){
				Person.getInstagram(person[0], category)
			}
			if(person[0].social[0].youtube !== ''){
				Person.getYoutube(person[0], category)
			}
		})
	}

	this.render = function(person){
		var template_compiled = _.template(template_raw, {
			data: person,
			category: category
		})
		$('#person').html(template_compiled)
	}

	this.getTweets = function(person, category){
		$.getJSON('../../../data/social_media/twitter/' + category + '.json', function(data){
			tweetData = _.filter(data, function(a){
				if (a.user_data.name == person.name){
					return a.tweets
				}
			})
			var personTweets = tweetData[0].tweets
			var tweets = []
			for(key in personTweets){
				tweets.push(personTweets[key])
			}

			$.each(tweets, function(i, t){
				t['date_formatted'] = moment(tweets[i].created, 'ddd MMM DD HH:mm:ss ZZ YYYY')._d
			})

			tweets.sort(function(a, b){
				return b.date_formatted - a.date_formatted
			})

			Person.renderTweets(tweetData[0].user_data, tweets)
		})
	}

	this.getInstagram = function(person, category){
		$.getJSON('../../../data/social_media/instagram/' + category + '.json', function(data){
			for(key in data){
				if (key == person.name){
					instagramData = data[key]
				}
			}

			var photos = []
			for(photo in instagramData.photos){
				photos.push(instagramData.photos[photo])
			}

			$.each(photos, function(i, cr){
		        var date = new Date(0)
		        date.setUTCSeconds(cr.created_time)
		        var date_str = moment(date)
		        cr['date_formatted'] = date_str._d
			})

			photos.sort(function(a, b){
				return b.date_formatted - a.date_formatted
			})

			Person.renderInstagram(person, photos, instagramData.user)
		})
	}

	this.getYoutube = function(person, category){
		$.getJSON('../../../data/social_media/youtube/' + category + '.json', function(data){
			youtubeData = _.filter(data, function(a){
				if (a.user_data.name == person.name){
					return a.videos
				}
			})

			videoData = youtubeData[0].videos
			var videos = []
			for(key in videoData){
				videoData[key]['reference'] = (videoData[key]['thumbnail'].split('/'))[4]
				videos.push(videoData[key])
			}

			var months = new Array('January',' February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
			function formatDate(d){
				var date = d.split('T')
				var dateSplit = date[0].split('-')
				var year = parseInt(dateSplit[0])
				var month = parseInt(dateSplit[1]) - 1
				var day = parseInt(dateSplit[2])
				// var tweetDateMonth = months.indexOf(tweetDate[1])
				// var tweetDateDay = tweetDate[2]
				// var tweetTime = tweetDate[3].split(':')
				// var tweetTimeHour = tweetTime[0]
				// var tweetTimeMinutes = tweetTime[1]
				// var tweetTimeSeconds = tweetTime[2]
				return new Date(year, month, day)
			}

			$.each(videos, function(i, vid){
		        vid['published'] = formatDate(videos[i].published)
			})

			videos.sort(function(a, b){
				return b.published - a.published
			})

			Person.renderYoutube(youtubeData[0].user_data, videos)
		})
	}

	this.renderTweets = function(user, tweets){
		var templateTweetsCompiled = _.template(templateTweetsRaw, {
			user: user,
			tweets: tweets
		})
		$('#tweets').html(templateTweetsCompiled)
	}

	this.renderInstagram = function(person, photos, user){
		var templateInstagramCompiled = _.template(templateInstagramRaw, {
			data: photos,
			user: person
		})
		$('#instagram').html(templateInstagramCompiled)

		$('.user_photo').on('click', function(e){
			var thePerson = $(e.target).data('person')
			var thePhoto = $(e.target).data('photo')
			$('#myModal').modal('show')

			var modal = _.template(template_modal, {
				photos: photos,
				user: user,
				photo_data: thePhoto
			})
			$('.modal-content').html(modal)
		})
	}

	this.renderYoutube = function(user, videos){
		var templateYoutubeCompiled = _.template(templateYoutubeRaw, {
			user: user,
			videos: videos
		})
		$('#youtube').html(templateYoutubeCompiled)
	}
}

var template_raw = '<h3><%= data.name %></h3> \
<img src="<%- imagePath %><%- category %>/<%= _(data.name).photo() %>.jpg" class="treatment" /> \
<ul class="list-unstyled"> \
	<li><strong>Birthdate: </strong><%= data.birthdate %></li> \
	<li><strong>Birthplace: </strong><%= data.birthplace %></li> \
</ul> \
<h5>Facts</h5> \
<div class="social_links"> \
	<% if(data.social[0].facebook !== ""){ %> \
		<span><a href="http://www.facebook.com/<%= data.social[0].facebook %>" target="_blank"><i class="fa fa-facebook"></i></a></span> \
	<% } %> \
	<% if(data.social[0].website !== ""){ %> \
		<span><a href="<%= data.social[0].website %>" target="_blank"><i class="fa fa-globe"></i></a></span> \
	<% } %> \
</div>'

var templateTweetsRaw = '<h4 class="social_link"><a href="http://www.twitter.com/<%= user.user_name %>" target="_blank"><%= user.name %> on Twitter <i class="fa fa-twitter"></i></a></h4> \
<p><%= user.description %></p> \
<% for(var i=0; i < tweet_limit; i++){ %> \
	<div class="tweet"> \
		<img src="<%= user.profile_image %>" class="avatar" /> \
		<p class="created"><%= _(tweets[i].date_formatted).convertDateTime() %></p> \
		<p><%= tweets[i].text %></p> \
		<div class="clear_all"></div> \
	</div> \
<% } %>'

var templateInstagramRaw = '<h4 class="social_link"><a href="http://www.instagram.com/<%= user.social[0].instagram %>" target="_blank"><%- personName %> on Instagram <i class="fa fa-instagram"></i></a></h4> \
<p>Click on any thumbnail to see a larger version.</p> \
<% for(var i=0; i < data.length; i++){ %> \
	<div class="col-sm-1 photo"> \
		<img src="<%= data[i].thumbnail %>" class="user_photo" data-person="<%= person.shortname %>" data-photo="<%= i %>" /> \
		<p><%= _(data[i].date_formatted).convertTime() %></p> \
	</div> \
<% } %> \
<div class="clear_all"></div>'

var template_modal = '<div class="modal-header"> \
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
	<img src="<%= user.profile_picture %>" class="profile_pic" alt="" /><h4 class="modal-title" id="myModalLabel"><%= user.name %></h4> \
	<div class="clear_all"></div> \
</div> \
<div class="modal-body"> \
	<img src="<%= photos[photo_data].standard_resolution %>" /> \
	<p><span class="created"><%= _(photos[photo_data].date_formatted).convertTime() %></span> - <span class="caption"><%= photos[photo_data].caption["text"] %></span></p> \
</div> \
<div class="modal-footer"> \
	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
</div>'

var templateYoutubeRaw = '<h4 class="social_link"><a href="http://www.youtube.com/user/<%= user.user_name %>" target="_blank"><%= user.name %> on Youtube <i class="fa fa-youtube-play"></i></a></h4> \
<p><%= user.description %></p> \
<% for(var j=0; j<videos.length; j++){ %> \
	<% if(videos[j].activity_type == "upload"){ %> \
		<div class="video"> \
			<a href="http://www.youtube.com/watch?v=<%= videos[j].reference %>" target="_blank"><img src="<%= videos[j].thumbnail %>" class="thumb" /></a> \
			<h5><a href="http://www.youtube.com/watch?v=<%= videos[j].reference %>" target="_blank"><%= videos[j].title %></a></h5> \
			<p>Published on: <%= _(videos[j].published).convertDate() %></p> \
			<div class="clear_all"></div> \
		</div> \
	<% } %> \
<% } %> \
<div class="clear_all"></div>'





