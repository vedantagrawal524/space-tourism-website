import { getData } from "./data.js"; // Data import

// Buttons
const technologyButtons = document.querySelectorAll(".technology-item");

// Elements
const technologyName = document.getElementById("technology-name");
const technologyDescription = document.getElementById("technology-description");
const technologyImg = document.getElementById("technology-img-landscape");
const technologySource = document.getElementById("technology-img-portrait");

let technologyDataCache = {};

// Function: Update
async function updateTechnology(technologyValue) {
  // Check if the technology data is already cached
  if (!technologyDataCache[technologyValue]) {
    const data = await getData();
    technologyDataCache = data.technologys;
  }

  const tech = technologyDataCache[technologyValue];

  // Update
  if (tech) {
    technologyName.textContent = tech.name;
    technologyDescription.textContent = tech.description;

    technologySource.srcset = tech.images.portrait;
    technologyImg.src = tech.images.landscape;
    technologyImg.alt = tech.name;
  }
}

// Get sessionStorage
function getStoredTechnology() {
  return sessionStorage.getItem("selectedTechnology");
}

// Set sessionStorage
function setStoredTechnology(technologyName) {
  sessionStorage.setItem("selectedTechnology", technologyName);
}

// If the page was refreshed
const storedTechnology = getStoredTechnology();
if (storedTechnology) {
  const storedTechnologyButton = Array.from(technologyButtons).find(
    (button) => button.value === storedTechnology,
  );
  if (storedTechnologyButton) {
    storedTechnologyButton.classList.add("active");
    updateTechnology(storedTechnologyButton.value);
  }
} else {
  const firstButton = technologyButtons[0];
  firstButton.classList.add("active");
  setStoredTechnology(firstButton.value);
  updateTechnology(firstButton.value);
}

// Overwrite the session-storage
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    setStoredTechnology(technologyButtons[0].value);
  });
});

// Button - event
technologyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    technologyButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedTechnology = button.value;
    updateTechnology(selectedTechnology);
    setStoredTechnology(selectedTechnology);
  });
});
