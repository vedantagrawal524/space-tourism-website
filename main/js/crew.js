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

// Get sessionStorage
function getStoredCrew() {
  return sessionStorage.getItem("selectedCrew");
}

// Set sessionStorage
function setStoredCrew(crewName) {
  sessionStorage.setItem("selectedCrew", crewName);
}

// If the page was refreshed
const storedCrew = getStoredCrew();
if (storedCrew) {
  const storedCrewButton = Array.from(crewButtons).find(
    (button) => button.value === storedCrew,
  );
  if (storedCrewButton) {
    storedCrewButton.classList.add("active");
    updateCrew(storedCrewButton.value);
  }
} else {
  const firstButton = crewButtons[0];
  firstButton.classList.add("active");
  setStoredCrew(firstButton.value);
  updateCrew(firstButton.value);
}

// Overwrite the session-storage
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    setStoredCrew(crewButtons[0].value);
  });
});

// Button - event
crewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    crewButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCrew = button.value;
    updateCrew(selectedCrew);
    setStoredCrew(selectedCrew);
  });
});
