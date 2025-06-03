// Get the search form and input elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Add an event listener to the search form
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityName = searchInput.value.trim();

  // Send a request to the backend API
  const apiUrl = `/api/city/${cityName}`;
  const response = await fetch(apiUrl);
  const cityData = await response.json();

  // Display the search results
  displaySearchResults(cityData);
});

// Function to display the search results
function displaySearchResults(cityData) {
  const searchResultsContainer = document.getElementById('search-results');

  // Create HTML elements to display the search results
  const cityPhotosHtml = `
    <h2>Photos of ${cityData.name}</h2>
    <div class="photo-gallery">
      ${cityData.photos.map((photo) => `<img src="${photo.url}" alt="${photo.description}">`).join('')}
    </div>
  `;

  const customerReviewsHtml = `
    <h2>Customer Reviews of ${cityData.name}</h2>
    <div class="review-list">
      ${cityData.reviews.map((review) => `
        <div class="review">
          <h3>${review.title}</h3>
          <p>${review.description}</p>
          <p>Rating: ${review.rating}/5</p>
        </div>
      `).join('')}
    </div>
  `;

  const stayDetailsHtml = `
    <h2>Stay Details in ${cityData.name}</h2>
    <div class="stay-details">
      <p>Hotel: ${cityData.stay.hotel}</p>
      <p>Address: ${cityData.stay.address}</p>
      <p>Price: ${cityData.stay.price}</p>
    </div>
  `;

  const flightDetailsHtml = `
    <h2>Flight Details to ${cityData.name}</h2>
    <div class="flight-details">
      <p>Airline: ${cityData.flight.airline}</p>
      <p>Departure: ${cityData.flight.departure}</p>
      <p>Arrival: ${cityData.flight.arrival}</p>
      <p>Price: ${cityData.flight.price}</p>
    </div>
  `;

  // Display the search results
  searchResultsContainer.innerHTML = `
    ${cityPhotosHtml}
    ${customerReviewsHtml}
    ${stayDetailsHtml}
    ${flightDetailsHtml}
  `;
}