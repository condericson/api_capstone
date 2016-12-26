$(document).ready(function() {


//JAMBASE SEARCH AND API FUNCTIONS

//Jambase Api url and key
/*var jambaseApp = {
	jambaseApi: 'http://api.jambase.com',
	jambaseApiKey: 'dmuv2jdmqbcad4yhdwshehf5'
};

//Event listener for displaying events of searched artist
$('.js-artist-search-form').submit(function(event) {
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
		displayEvents(data);
	})
}

function displayEvents(data) {
	var eventDetails = data.Events;
	$(eventDetails).forEach(function(object) {
		$('.eventlist').html(
			'<ul>' + 
			'<li>' + eventDetails[object].Date + '</li>' + 
			'<li>' + eventDetails[object].Venue.Name + '</li>' + 
			'<li>' + eventDetails[object].Venue.Address + '</li>' + 
			'<li>' + eventDetails[object].Venue.City + '</li>' + 
			'<li>' + eventDetails[object].Venue.State + '</li>' + 
			'<li>' + eventDetails[object].Venue.ZipCode + '</li>' +
			'</ul>'
			);
	})
		


}*/











//GOOGLE MAPPING API AND FUNCTIONS

//event listener for maping venue location
$('mapbutton').click(function(event) {
	event.preventDefault();
	initMap(this);
})

function initMap(button) {
	var info = button.parent().$('ul');
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 4,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});
}










///SPOTIFY SEARCH AND API FUNCTIONS

/*
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








//document.ready ending brackets
});