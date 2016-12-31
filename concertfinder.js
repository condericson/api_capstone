$(document).ready(function() {

$('.loading, .pagecover').addClass('hidden');



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
	$(this).find('.spelling').remove();
	$(this).find('#noresults').remove();
	$('#eventlist').html("<h1 class='loading'>Loading...</h1>")
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
		console.log(data);
		if (data.Artists.length == 0) {
			console.log('No results found');
			$('.js-search-form').append('<p class="spelling">No results found. Check the spelling?</p>')

		}
		else if (data) {
			$('.js-search-form').find($('.spelling')).remove();
			$('.artistname').text("");
			$('.artistname').text(data.Artists[0].Name);
			getJambaseEvents(jambaseApp, data.Artists[0].Id);
		}
		else {
			console.log('No results found');
		}
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
			$('.js-search-form').append('<p id="noresults">No results found</p>');
			;
		}
		else {
			
			displayEvents(data);	
		}
		
	})
}

//function for displaying Events
function displayEvents(data) {
	//clear out event list
	$('#eventlist').html("");
	var eventDetails = data.Events;
	var month = null;
	$('.titlepage').addClass('hidden');
	$('#nav, #eventlist').removeClass('hidden');
	$('#upcoming').removeClass('hidden');
	$('#search').removeClass('searchcontainer');
	$('#search').addClass('searchcontainernav');
	eventDetails.forEach(function(object) {	
		var monthName = "";
		if (month !== moment(object.Date).format('MM')) {
			monthName = `<span class="month">${moment(object.Date).format("MMMM YY")}</span>`;
			month = moment(object.Date).format('MM');
		}
		var tickets = "";
		if (object.TicketUrl !== "") {
			tickets = '<a href="' + object.TicketUrl + '" target="_blank"><button class="tixbutton">Tickets!</button></a>';
		}
			$('#eventlist').append(
		      '<div class="eventitem">' +
		      monthName + 
		      '<p class="venue">' + object.Venue.Name + '</p>' +
		      '<p class="date">' + moment(object.Date).format("LLL") + '</p>' +
		      '<p class="address">' + object.Venue.Address + ' ' + object.Venue.City + ', ' + object.Venue.State + ' ' + 
		      object.Venue.ZipCode + '</p>' + 
		      '<button class="mapbutton">Map it!</button>' + tickets +
		      '<input type="hidden" class="lat" value="' + object.Venue.Latitude + '">' +
		      '<input type="hidden" class="lng" value="' + object.Venue.Longitude + '">' +
		      '</div>'
		      );






		
	})
		


}




//Seatgeek SEARCH AND API FUNCTIONS
//Seatgeek Api url and key
/*var seatGeekApp = {
	seatGeekApi: 'https://api.seatgeek.com/2',
	seatGeekClientId: 'NjUzMjM5NXwxNDgzMTQwMjE0',
	seatGeekApiKeySeceret: '5Xm4mtBvDFo04t4YznGgp9f07kLayQ5wk5y-oMvD'
};

//Event listener for displaying events of searched artist
$('.js-search-form').submit(function(event) {
	event.preventDefault();
	$('#eventlist').html("<h1 class='loading'>Loading...</h1>")
	console.log($('#js-artist').val())
	getSeatGeekArtistId(seatGeekApp, $('#js-artist').val());	
})

//function for obtaining artistID from search
function getSeatGeekArtistId(seatGeekApp, name) {
	var url = seatGeekApp.seatGeekApi + '/performers';
	var params = {
		client_id: seatGeekApp.seatGeekClientId,
		client_secret: seatGeekApp.seatGeekApiKeySeceret,
		page: 0,
		q: name
	}
	$.getJSON(url, params, function(data) {
		console.log(data);
		if (data.Artists.length == 0) {
			console.log('No results found');
			$('.js-search-form').append('<p class="spelling">No results found. Check the spelling?</p>')

		}
		else if (data) {
			$('.artistname').append(data.Artists[0].Name);
			getJambaseEvents(jambaseApp, data.Artists[0].Id);
		}
		else {
			console.log('No results found');
		}
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
			$('#eventlist').html(
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
	$('#eventlist').html("");
	var eventDetails = data.Events;
	eventDetails.forEach(function(object) {
		$('.titlepage').addClass('hidden');
		$('#nav, #eventlist').removeClass('hidden');
		$('#upcoming').removeClass('hidden');
		$('#search').removeClass('searchcontainer');
		$('#search').addClass('searchcontainernav');
		if (object.TicketUrl == "") {
			$('#eventlist').append(
		      '<div class="eventitem">' +
		      '<p class="venue">' + object.Venue.Name + '</p>' +
		      '<p class="date">' + moment(object.Date).format("LLL") + '</p>' +
		      '<p class="address">' + object.Venue.Address + ' ' + object.Venue.City + ', ' + object.Venue.State + ' ' + 
		      object.Venue.ZipCode + '</p>' + 
		      '<button class="mapbutton">Map it!</button>' + 
		      '<p class="lat, hidden">' + object.Venue.Latitude + '</p>' +
		      '<p class="lng, hidden">' + object.Venue.Longitude + '</p>' +
		      '</div>'
		      );
	  		}
	  	else {
		  	$('#eventlist').append(
		      '<div class="eventitem">' +
		      '<p class="venue">' + object.Venue.Name + '</p>' +
		      '<p class="date">' + moment(object.Date).format("LLL") + '</p>' +
		      '<p class="address">' + object.Venue.Address + ' ' + object.Venue.City + ', ' + object.Venue.State + ' ' + 
		      object.Venue.ZipCode + '</p>' + 
		      '<button class="mapbutton">Map it!</button>' + '<a href="' + object.TicketUrl + '" target="_blank"><button class="tixbutton">Tickets!</button></a>' + 
		      '<p class="lat, hidden">' + object.Venue.Latitude + '</p>' +
		      '<p class="lng, hidden">' + object.Venue.Longitude + '</p>' +
		      '</div>'
			);
	  	}	
	})
}

*/


//GOOGLE MAPPING API AND FUNCTIONS

//event listener for maping venue location
$('#eventlist').on('click', '.mapbutton', function(event) {
	event.preventDefault();
	var container = $(this).parent();
	var eventlistcontainer = $(this).parent().parent();
	eventlistcontainer.find('#mapcontainer').remove();
	container.append('<div id="mapcontainer"><div id="map"></div></div>');
	google.maps.event.trigger(map, 'resize');
	initMap($(this));
})

function initMap(button) {
	var info = button.parent();
	var latitude = info.find($('.lat')).val();
	var longitude = info.find($('.lng')).val();
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