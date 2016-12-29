$(document).ready(function() {





//SPOTIFY SEARCH AND API FUNCTIONS

/*

//Spotify Api url and key
/*var spotifyApp = {
	spotifyApi: 'https://api.spotify.com',
	spotifyApiKey: '61057b84405e46708ec8db976c69e093'
};
var SPOTIFY_BASE_URL = 'https://api.spotify.com';

function getDataFromApi(addressEntry, citystatezipEntry, callback) {
	var query = {
		'zws-id': 'cbbf4a55f6a7486bb203a7efc97ada5c',
		address: addressEntry,
		citystatezip: citystatezipEntry
	}
	$.getJSON(ZILLOW_BASE_URL, query, callback);
}

function displayZillowSearchData(data) {
	console.log(data);
}


function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var addressEntry = $(this).find('.js-address').val();
    var citystatezipEntry = $(this).find('.js-zip').val();
    getDataFromApi(addressEntry, citystatezipEntry, displayZillowSearchData);
  });
}

$(function(){watchSubmit();});
*/





//JAMBASE SEARCH AND API FUNCTIONS

//Jambase Api url and key
var jambaseApp = {
	jambaseApi: 'http://api.jambase.com',
	jambaseApiKey: 'dmuv2jdmqbcad4yhdwshehf5'
};

//Event listener for displaying events of searched artist
$('.js-search-form').submit(function(event) {
	event.preventDefault();
	console.log($('#js-artist').val())
	getJambaseArtistId(jambaseApp, $('#js-artist').val());	
})

//function for obtaining artistID from search
function getJambaseArtistId(jambaseApp, name) {
	var url = jambaseApp.jambaseApi + '/artists';
	var params = {
		name: name,
		page: 0,
		api_key: jambaseApp.jambaseApiKey
	}
	$.getJSON(url, params, function(data) {
		if (data) {
			getJambaseEvents(jambaseApp, data.Artists[0].Id);
		}
		else {
			console.log('No results found');
		}
		console.log(data);
	})
}

//function for obtaining events from artistID
function getJambaseEvents(jambaseApp, artistId) {
	var url = jambaseApp.jambaseApi + '/events';
	var params = {
		artistId: artistId,
		page: 0,
		api_key: jambaseApp.jambaseApiKey
	}
	$.getJSON(url, params, function(data){
		console.log(data);
		if (data.Events.length == 0){
			$('.eventlist').append(
			'<p id="noresults">No results found</p>'
			);
		}
		else {
			displayEvents(data);	
		}
		
	})
}

//function for displaying Events
function displayEvents(data) {
	//clear out event list
	$('.eventlist').html("");
	var eventDetails = data.Events;
	eventDetails.forEach(function(object) {
		//var dateStamp = new Date(object.Date);
		$('.eventlist').append(
			'<ul class="eventitem">' + 
			'<li>' + moment(object.Date).format("MMMM Do YYYY") + '</li>' + 
			'<li>' + object.Venue.Name + '</li>' + 
			'<li>' + object.Venue.Address + '</li>' + 
			'<li>' + object.Venue.City + '</li>' + 
			'<li>' + object.Venue.State + '</li>' + 
			'<li>' + object.Venue.ZipCode + '</li>' +
			'<li class="lat">' + object.Venue.Latitude + '</li>' +
			'<li class="lng">' + object.Venue.Longitude + '</li>' +
			'<button class="mapbutton" type="submit">Map it!</button>' +
			'</ul>'			
			);
	})
		


}








//GOOGLE MAPPING API AND FUNCTIONS

//event listener for maping venue location
$('.eventlist').on('click', '.eventitem .mapbutton', function(event) {
	event.preventDefault();
	google.maps.event.trigger(map, 'resize');
	initMap($(this));
})

function initMap(button) {
	var info = button.parent();
	var latitude = info.find($('.lat')).html();
	var longitude = info.find($('.lng')).html();
	var location = {lat: Number(latitude), lng: Number(longitude)};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: location
	});
	var marker = new google.maps.Marker({
	  position: location,
	  map: map
	});
}













//document.ready ending brackets
});