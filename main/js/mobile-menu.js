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
  navLink.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// Escape key - keydown (Close menu with Escape key)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    toggleMenu();
  }
});

// Active Link
window.addEventListener("DOMContentLoaded", () => {
  //filename
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((navLink) => {
    const link = navLink.querySelector("a");
    const href = link.getAttribute("href").replace("./", "");
    if (currentPage === href) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
});
