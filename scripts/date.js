// Get current date data for the footer
const today = new Date();
const currentYear = today.getFullYear();

// Inject the footer dates into the HTML spans
document.getElementById("currentYear").innerHTML = currentYear;
document.getElementById("lastModified").innerHTML = document.lastModified;
