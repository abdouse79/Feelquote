// Constants
const CLIENT_ID = "OGxq7fKbM_7tRsRDiR1o_YiMbeMxNIo8b7TqfjN3BLUOTbB-FyC8ljGGp4OkUPLA";
const REDIRECT_URI = "https://abdouse79.github.io/Feelquote/";
const AUTH_URL = "https://api.genius.com/oauth/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) + "&response_type=token";

// Function to initiate the authentication process
function authenticate() {
  window.location.href = AUTH_URL;
}

// Function to handle the access token extraction and subsequent API requests
function handleAccessToken() {
  var url = window.location.href;
  var accessToken = extractAccessToken(url);

  if (accessToken) {
    // Use the access token to make API requests
    // Call the necessary functions here, e.g., searchLyrics(), displayQuotes(), etc.
    // Pass the access token as a parameter to your API requests

    // Example:
    fetchLyrics(accessToken);
  }
}

// Function to extract the access token from the URL hash fragment
function extractAccessToken(url) {
  var accessTokenRegex = /access_token=([^&]+)/;
  var match = url.match(accessTokenRegex);
  return match ? match[1] : null;
}

// Function to fetch lyrics using the access token
function fetchLyrics(accessToken) {
  var searchInput = document.getElementById("searchInput");
  var query = searchInput.value.trim();
  var url = "https://api.genius.com/search?q=" + encodeURIComponent(query);

  fetch(url, {
    headers: {
      "Authorization": "Bearer " + U0JutdWkgI8x2wwwXkwXDnWJYzeWiurd5xwf_IThdhnRb3-czv6kYkkaQZV-0AeE
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayQuotes(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// Call the handleAccessToken function when the page loads
window.onload = function() {
  handleAccessToken();
};
