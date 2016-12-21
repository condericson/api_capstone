$(document).ready(function() {


var ZILLOW_BASE_URL = 'http://www.zillow.com/webservice/GetSearchResults.htm';

function getDataFromApi(addressEntry, citystatezipEntry, callback) {
	var query = {
		'zws-id': 'X1-ZWz1fkmpve7fnv_2yr7j',
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

});