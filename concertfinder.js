$(document).ready(function() {

$('.loading, .pagecover').addClass('hidden');


//SeatGeek SEARCH AND API FUNCTIONS

//SeatGeek Api url and key
var seatGeekApp = {
	seatGeekUrl: 'https://api.seatgeek.com/2/',
	seatGeekClientId: 'NjUzMjM5NXwxNDgzMTQwMjE0',
	seatGeekClientSecret: '5Xm4mtBvDFo04t4YznGgp9f07kLayQ5wk5y-oMvD'
};

//Event listener for displaying events of searched artist
$('#js-search-form').submit(function(event) {
	event.preventDefault();
	$(this).find('#noresults').remove();
	$('#eventlist').html("<h1 class='loading'>Loading...</h1>")
	console.log($('#js-artist').val())
	var correctedName = $('#js-artist').val().replace(/\s+/g, '-');
	$('.artistname').text("");
	$('.artistname').text($('#js-artist').val());
	console.log(correctedName);
	getEventInfo(seatGeekApp, correctedName);	
})

//function for obtaining artistID from search
function getEventInfo(seatGeekApp, name) {
	var url = seatGeekApp.seatGeekUrl + '/events';
	var params = {
		client_id: seatGeekApp.seatGeekClientId,
		client_secret: seatGeekApp.seatGeekClientSecret,
		'performers.slug': name,
	}
	$.getJSON(url, params, function(data) {
		console.log(data);
		if (data.meta.total == 0) {
			console.log('No results found');
			$('#eventlist').find($('.loading')).remove();
			$('#js-search-form').find('.spelling').remove();
			$('#js-search-form').append('<p class="spelling">No results found. Check the spelling?</p>')
		}
		else if (data) {
			$('#js-search-form').find($('.spelling')).remove();
			/*$('.artistname').text("");
			$('.artistname').text(data.events[0].title);*/
			displayEvents(data);
		}
		else {
			console.log('No results found');
		}
	})
}

//function for displaying Events
function displayEvents(data) {
	//clear out event list
	$('#eventlist').html("");
	var eventDetails = data.events;
	var month = null;
	$('#eventlist').removeClass('hidden');
	$('#nav').removeClass('nav1');
	$('#nav').addClass('nav2');
	$('#navtitle').removeClass('navtitle1');
	$('#navtitle').addClass('navtitle2');
	$('#search').removeClass('searchcontainer1');
	$('#search').addClass('searchcontainer2');
	$('#powered').removeClass('powered1');
	$('#powered').addClass('powered2');
	$('#upcoming').removeClass('hidden');
	eventDetails.forEach(function(object) {	
		var monthName = "";
		if (month !== moment(object.datetime_local).format('MM')) {
			monthName = `<span class="month">${moment(object.datetime_local).format("MMMM YYYY")}</span>`;
			month = moment(object.datetime_local).format('MM');
		}
		var tickets = "";
		if (object.TicketUrl !== "") {
			tickets = '<a href="' + object.url + '" target="_blank"><button class="tixbutton">Tickets!</button></a>';
		}
			$('#eventlist').append(
		      '<div class="eventitem">' +
		      monthName + 
		      '<p class="artists">' + object.title + ' at <span class="venue">' + object.venue.name + '</span></p>' +
		      '<p class="date">' + moment(object.datetime_local).format("LLL") + '</p>' +
		      '<p class="address">' + object.venue.address + ' ' + object.venue.extended_address + '</p>' + 
		      '<button class="mapbutton">Map it!</button>' + tickets +
		      '<input type="hidden" class="lat" value="' + object.venue.location.lat + '">' +
		      '<input type="hidden" class="lng" value="' + object.venue.location.lon + '">' +
		      '</div>'
		      );		
	})
}






//GOOGLE MAPPING API AND FUNCTIONS

//event listener for maping venue location
$('#eventlist').on('click', '.mapbutton', function(event) {
	event.preventDefault();
	var container = $(this).parent();
	var eventlistcontainer = $(this).parent().parent();
	eventlistcontainer.find('#mapcontainer').remove();
	container.append('<div id="mapcontainer"><div class="closebutton"><span class="x">x</span></div><div id="map"></div></div>');
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

$('#eventlist').on('click', '.closebutton', function(event) {
	event.preventDefault();
	var eventlistcontainer = $(this).parent().parent();
	eventlistcontainer.find('#mapcontainer').remove();
})


});