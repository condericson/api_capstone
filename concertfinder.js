$(document).ready(function() {

/*//Date Formatting function
Date.prototype.getFromFormat = function(format) {
  var yyyy = this.getFullYear().toString();
  format = format.replace(/yyyy/g, yyyy)
  var mm = (this.getMonth()+1).toString();
  format = format.replace(/mm/g, (mm[1]?mm:"0"+mm[0]));
  var dd  = this.getDate().toString();
  format = format.replace(/dd/g, (dd[1]?dd:"0"+dd[0]));
  var hh = this.getHours().toString();
  format = format.replace(/hh/g, (hh[1]?hh:"0"+hh[0]));
  var ii = this.getMinutes().toString();
  format = format.replace(/ii/g, (ii[1]?ii:"0"+ii[0]));
  var ss  = this.getSeconds().toString();
  format = format.replace(/ss/g, (ss[1]?ss:"0"+ss[0]));
  return format;
};*/




/*//JAMBASE SEARCH AND API FUNCTIONS

//Jambase Api url and key
var jambaseApp = {
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

//function for displaying Events
function displayEvents(data) {
	//clear out event list
	$('.eventlist').html("");
	var eventDetails = data.Events;
	eventDetails.forEach(function(object) {
		//var dateStamp = new Date(object.Date);
		$('.eventlist').append(
			'<ul>' + 
			'<li>' + moment(object.Date).format("MMMM Do YYYY") + '</li>' + 
			'<li>' + object.Venue.Name + '</li>' + 
			'<li>' + object.Venue.Address + '</li>' + 
			'<li>' + object.Venue.City + '</li>' + 
			'<li>' + object.Venue.State + '</li>' + 
			'<li>' + object.Venue.ZipCode + '</li>' +
			'<li class="lat">' + object.Venue.Latitude + '</li>' +
			'<li class="lng">' + object.Venue.Longitude + '</li>' +
			'</ul>' + 
			'<button class="mapbutton" type="submit">Map it!</button>'
			);
	})
		


}*/








//GOOGLE MAPPING API AND FUNCTIONS

//event listener for maping venue location
$('.eventlist').on('click', '.eventitem .mapbutton', function(event) {
	event.preventDefault();
	console.log($(this));
	google.maps.event.trigger(map, 'resize');
	initMap($(this));
})

function initMap(button) {
	var info = button.parent();
	var latitude = info.find($('.lat')).html();
	var longitude = info.find($('.lng')).html();
	console.log(longitude);
	console.log(Number(longitude));
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