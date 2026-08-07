// discover.js
import { members } from "../data/members.mjs";

const container = document.querySelector("#all-places");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");
const welcome = document.querySelector("#welcome");

// LocalStorage welcome message
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();
if (lastVisit) {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  welcome.textContent = `Welcome back! You last visited ${days} day(s) ago.`;
} else {
  welcome.textContent = "Welcome! This is your first visit.";
}
localStorage.setItem("lastVisit", now);

// Render members
function renderMembers() {
  container.innerHTML = members.map(m => `
    <div class="card">
      <img src="${m.image}" alt="${m.name}" loading="lazy">
      <h2>${m.name}</h2>
      <p class="tagline">${m.tagline}</p>
      <p><strong>Address:</strong> ${m.address}</p>
      <p><strong>Phone:</strong> ${m.phone}</p>
      <p><a href="${m.website}" target="_blank">Website</a></p>
      <button class="details" data-name="${m.name}">Learn More</button>
    </div>
  `).join("");

  document.querySelectorAll(".details").forEach(btn => {
    btn.addEventListener("click", () => showModal(btn.dataset.name));
  });
}

// Modal dialog
function showModal(name) {
  const member = members.find(m => m.name === name);
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${member.name}</h2>
      <img src="${member.image}" alt="${member.name}">
      <p>${member.tagline}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Website</a></p>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".close").addEventListener("click", () => modal.remove());
  window.addEventListener("keydown", e => { if (e.key === "Escape") modal.remove(); });
}

// Grid/List toggle with localStorage
function setView(view) {
  container.className = view === "grid" ? "grid-layout" : "list-layout";
  localStorage.setItem("viewPreference", view);
}
gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

const savedView = localStorage.getItem("viewPreference") || "grid";
setView(savedView);

renderMembers();
