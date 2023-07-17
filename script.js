function searchLyrics() {
  var searchInput = document.getElementById("searchInput");
  var query = searchInput.value.trim();
  var accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual access token

  var url = "https://api.genius.com/search?q=" + encodeURIComponent(query);
  fetchLyrics(url, accessToken);
}

function fetchLyrics(url, accessToken) {
  fetch(url, {
    headers: {
      "Authorization": "Bearer " + accessToken
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

function displayQuotes(data) {
  var quoteContainer = document.getElementById("quoteContainer");
  quoteContainer.innerHTML = "";

  for (var i = 0; i < data.response.hits.length; i++) {
    var result = data.response.hits[i].result;
    var title = result.title;
    var artist = result.primary_artist.name;

    var quoteElement = document.createElement("div");
    quoteElement.innerHTML = `<h3>${artist} - ${title}</h3>`;

    quoteContainer.appendChild(quoteElement);
  }
}
