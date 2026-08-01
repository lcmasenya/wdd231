// join.js

// Auto-fill timestamp
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").value = new Date().toISOString();
});

// Modal toggle logic
const modals = document.querySelectorAll(".modal");
const links = document.querySelectorAll(".membership-cards a");
const closes = document.querySelectorAll(".close");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const modal = document.querySelector(link.getAttribute("href"));
    modal.style.display = "block";
  });
});

closes.forEach(close => {
  close.addEventListener("click", () => {
    close.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
});
