var Tweets = new function(){
	this.get = function(){
		$.getJSON('../data/twitter_mentions_senators.json', function(data){
			Tweets.render(data)
		})
	}

	this.render = function(tweets){
		var templateCompiled = _.template(templateRaw, {
			tweets: tweets
		})
		$('#example').html(templateCompiled)
	}
}

Tweets.get()

var templateRaw = '<h3>Tweets</h3> \
<% console.log(tweets) %> \
<% for(key in tweets){ %> \
	<h4><%= key %></h5> \
	<% var allTweets = tweets[key].tweets %> \
	<ul class="list-unstyled"> \
		<% for(var i=0;i<allTweets.length; i++){ %> \
			<% var num = i + 1 %> \
			<li><%= num %>: <%= allTweets[i] %></li> \
		<% } %> \
	</ul> \
<% } %>'