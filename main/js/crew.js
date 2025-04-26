import { getData } from "./data.js"; // Data

// Buttons
const crewButtons = document.querySelectorAll(".crew-item");

// Elements
const crewPosition = document.getElementById("crew-position");
const crewName = document.getElementById("crew-name");
const crewDescription = document.getElementById("crew-description");
const crewImgPng = document.getElementById("crew-img-png");
const crewImgWebp = document.getElementById("crew-img-webp");

let crewDataCache = {};

// Function: Update
async function updateCrew(crewNameValue) {
  // Check if the crew data is already cached
  if (!crewDataCache[crewNameValue]) {
    const data = await getData();
    crewDataCache[crewNameValue] = data.crews[crewNameValue];
  }

  const crewData = crewDataCache[crewNameValue];

  // Update
  if (crewData) {
    crewPosition.textContent = crewData.role;
    crewName.textContent = crewData.name;
    crewDescription.textContent = crewData.bio;
    crewImgPng.src = crewData.images.png;
    crewImgPng.alt = crewData.name;
    crewImgWebp.srcset = crewData.images.webp;
  }
}

// Default
const defaultCrewButton =
  document.querySelector(".crew-item.active") || crewButtons[0];
if (defaultCrewButton) {
  defaultCrewButton.classList.add("active");
  updateCrew(defaultCrewButton.value);
}

// Button - event
crewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    crewButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCrew = button.value;
    updateCrew(selectedCrew);
  });
});
