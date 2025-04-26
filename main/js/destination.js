import { getData } from "./data.js"; // Data

// Buttons
const destinationButtons = document.querySelectorAll(".destination-item");

// Elements
const destinationTitle = document.getElementById("destination-title");
const destinationDescription = document.getElementById(
  "destination-description",
);
const avgDistance = document.getElementById("avg-distance");
const travelTime = document.getElementById("travel-time");
const destinationImgPng = document.getElementById("destination-img-png");
const destinationImgWebp = document.getElementById("destination-img-webp");

let destinationDataCache = {};

// Function to update the destination content
async function updateDestination(destinationName) {
  // Check if the data is already cached
  if (!destinationDataCache[destinationName]) {
    const data = await getData();
    destinationDataCache = data.destinations;
  }

  const destination = destinationDataCache[destinationName];

  // Update the destination content
  if (destination) {
    destinationTitle.textContent = destination.name;
    destinationDescription.textContent = destination.description;
    avgDistance.textContent = destination.distance;
    travelTime.textContent = destination.travel;
    destinationImgPng.src = destination.images.png;
    destinationImgPng.alt = destination.name;
    destinationImgWebp.srcset = destination.images.webp;
  }
}

// Get sessionStorage
function getStoredDestination() {
  return sessionStorage.getItem("selectedDestination");
}

// Set sessionStorage
function setStoredDestination(destinationName) {
  sessionStorage.setItem("selectedDestination", destinationName);
}

// If the page was refreshed
const storedDestination = getStoredDestination();
if (storedDestination) {
  const storedDestinationButton = Array.from(destinationButtons).find(
    (button) => button.value === storedDestination,
  );
  if (storedDestinationButton) {
    storedDestinationButton.classList.add("active");
    updateDestination(storedDestinationButton.value);
  }
} else {
  const firstButton = destinationButtons[0];
  firstButton.classList.add("active");
  setStoredDestination(firstButton.value);
  updateDestination(firstButton.value);
}

// Overwrite the session-storage
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    setStoredDestination(destinationButtons[0].value);
  });
});

// Button - event listener
destinationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    destinationButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedDestination = button.value;
    updateDestination(selectedDestination);
    setStoredDestination(selectedDestination);
  });
});
