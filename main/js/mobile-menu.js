// DOM Elements
const body = document.querySelector("#page");
const menuButton = document.querySelectorAll(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const navLinks = document.querySelectorAll(".nav-link");

const toggleMenu = () => {
  body.classList.toggle("deactive");
  mobileMenu.classList.toggle("active");
};

// Hamburger Button - Click
menuButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleMenu();
  });
});

// Nav-links - Click (Close menu when clicked & goes to link-location)
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    navLink.classList.add("active");
    toggleMenu();
  });
});

// Escape key - keydown (Close menu with escape Key)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    toggleMenu();
  }
});
