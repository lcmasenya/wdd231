const url = 'data/members.json';
const spotlightsContainer = document.querySelector('#spotlights');

async function getMembersData() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // If your JSON is wrapped in { "members": [...] }
    processSpotlights(data.members);

    // If your JSON is just an array, use:
    // processSpotlights(data);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function processSpotlights(members) {
  // Filter for Gold (3) or Silver (2) members
  const highLevelMembers = members.filter(member =>
    member.level === 2 || member.level === 3
  );

  // Shuffle the array randomly
  const shuffled = highLevelMembers.sort(() => 0.5 - Math.random());

  // Pick 2–3 members
  const spotlightCount = Math.floor(Math.random() * 2) + 2; // gives 2 or 3
  const selected = shuffled.slice(0, spotlightCount);

  displayMembers(selected);
}

function displayMembers(members) {
  members.forEach(member => {
    let card = document.createElement("section");

    // Add class based on membership level
    if (member.level === 3) {
      card.classList.add("gold");
    } else if (member.level === 2) {
      card.classList.add("silver");
    } else {
      card.classList.add("member");
    }

    // Build card content
    card.innerHTML = `
      <h2>${member.company}</h2>
      <img src="images/${member.imagefile}" alt="Logo of ${member.company}" width="200">
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Years in Business:</strong> ${member.years}</p>
      <p><a href="${member.url}" target="_blank">Visit Website</a></p>
      <p class="membership">${member.level === 3 ? "Gold" : "Silver"} Member</p>
    `;

    spotlightsContainer.appendChild(card);
  });
}

// Run the function
getMembersData();
