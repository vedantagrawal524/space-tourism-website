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

// Function: Update
async function updateDestination(destinationName) {
  // Check if the crew data is already cached
  if (!destinationDataCache[destinationName]) {
    const data = await getData();
    destinationDataCache = data.destinations;
  }

  const destination = destinationDataCache[destinationName];

  // Update
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

// Default
const defaultDestinationButton =
  document.querySelector(".destination-item.active") || destinationButtons[0];
if (defaultDestinationButton) {
  defaultDestinationButton.classList.add("active");
  updateDestination(defaultDestinationButton.value);
}

// Button - event
destinationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    destinationButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedDestination = button.value;
    updateDestination(selectedDestination);
  });
});
