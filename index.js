/* 

1. A user types in a string into the input box (js-query)
2. User presses the submit button 
3. On submit, we make a request into YouTube's servers?
4. The string that they entered into js-query gets passed into APIs with 'snippet' or 'part'?
4. Youtube returns the requested information
6. matched videos get displayed into my search results div (js-search-results)

*/

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const request = {
  	part: "snippet",
  	key: "AIzaSyBdEUrzo0gmhwm2Qy6DCHB7MoeNy97Rqj4",
  	q: searchTerm
  };

  $.getJSON(YOUTUBE_SEARCH_URL, request, callback);
}


function renderSearchResult(result) {
  return `
    <div>
    	<a href="https://www.youtube.com/watch?v=${result.id.videoId}"><img src="${result.snippet.thumbnails.medium.url}" alt=""></a>
    	<br>
    	<h4>${result.snippet.title}</h4>
  `;
}


//
function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderSearchResult(item));
  $('.js-search-results').html(results); 
}

// this function (below) is waiting for the user to enter in a search term (.js-search-term) and press the 'submit' button.
function listenForSubmit() {
	$(".js-search-form").submit(function(event) {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find(".js-search-term"); // creating a variable "querTarget" which is 
		const query = queryTarget.val(); //setting a variable "query" to the value of queryTarget
		queryTarget.val(""); // clears the input box - but still storing the original search term in "query"
		getDataFromApi(query, displayYouTubeSearchData); // this is calling the function "getDatafromApi" with "query" and the callback function "displayYT..."
	});
}

$(listenForSubmit);











