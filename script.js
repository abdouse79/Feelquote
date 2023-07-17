function searchLyrics() {
  var searchInput = document.getElementById("searchInput");
  var query = searchInput.value.trim();
  var url = "https://api.genius.com/search?q=" + encodeURIComponent(query);

  fetch(url, {
    headers: {
      "Authorization": "U0JutdWkgI8x2wwwXkwXDnWJYzeWiurd5xwf_IThdhnRb3-czv6kYkkaQZV-0AeE"
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
    var lyricsUrl = result.url;

    // Fetch the full lyrics for each song
    fetchLyrics(lyricsUrl, artist, title);
  }
}

function fetchLyrics(lyricsUrl, artist, title) {
  fetch("https://cors-anywhere.herokuapp.com/" + lyricsUrl)
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      displayLyrics(data, artist, title);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displayLyrics(lyrics, artist, title) {
  var quoteContainer = document.getElementById("quoteContainer");

  var lyricsElement = document.createElement("div");
  lyricsElement.className = "lyrics";
  lyricsElement.innerHTML = `<h3>${artist} - ${title}</h3><pre>${lyrics}</pre>`;

  quoteContainer.appendChild(lyricsElement);
}
