// thankyou.js

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const submittedData = `
    <p><strong>First Name:</strong> ${params.get("firstName")}</p>
    <p><strong>Last Name:</strong> ${params.get("lastName")}</p>
    <p><strong>Email:</strong> ${params.get("email")}</p>
    <p><strong>Mobile:</strong> ${params.get("mobile")}</p>
    <p><strong>Organization:</strong> ${params.get("organization")}</p>
    <p><strong>Timestamp:</strong> ${params.get("timestamp")}</p>
  `;
  document.getElementById("submittedData").innerHTML = submittedData;
});
