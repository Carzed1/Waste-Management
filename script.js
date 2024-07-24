// Initialize the map
var map = L.map("map").setView([28.6139, 77.209], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Dustbin data
var dustbins = [
  { lat: 28.6304, lng: 77.2177, percentage: 75, name: "Connaught Place" },
  { lat: 28.6139, lng: 77.209, percentage: 45, name: "India Gate" },
  { lat: 28.5562, lng: 77.1, percentage: 90, name: "Qutub Minar" },
  { lat: 28.6469, lng: 77.216, percentage: 60, name: "Red Fort" },
  { lat: 28.5893, lng: 77.2507, percentage: 80, name: "Lotus Temple" },
  { lat: 28.5276, lng: 77.138, percentage: 70, name: "Hauz Khas" },
  { lat: 28.6129, lng: 77.2295, percentage: 65, name: "Akshardham" },
  { lat: 28.4744, lng: 77.0266, percentage: 85, name: "Garden of Five Senses" },
  { lat: 28.6448, lng: 77.2135, percentage: 50, name: "Chandni Chowk" },
  { lat: 28.6841, lng: 77.215, percentage: 40, name: "Janpath" },
  { lat: 28.6216, lng: 77.2106, percentage: 50, name: "Rajpath" },
  { lat: 28.607, lng: 77.2184, percentage: 65, name: "National Museum" },
  { lat: 28.5954, lng: 77.1566, percentage: 30, name: "Jantar Mantar" },
  { lat: 28.57, lng: 77.23, percentage: 72, name: "Delhi Zoo" },
  { lat: 28.583, lng: 77.199, percentage: 57, name: "Hawa Mahal" },
  { lat: 28.62, lng: 77.085, percentage: 78, name: "Dilli Haat" },
  { lat: 28.579, lng: 77.085, percentage: 66, name: "Panjim Park" },
  { lat: 28.6244, lng: 77.2126, percentage: 59, name: "Gandhi Smriti" },
  { lat: 28.585, lng: 77.211, percentage: 62, name: "Indira Gandhi Memorial" },
  { lat: 28.629, lng: 77.207, percentage: 53, name: "Rashtrapati Bhavan" },
  { lat: 28.58, lng: 77.175, percentage: 88, name: "Khan Market" },
  { lat: 28.638, lng: 77.213, percentage: 42, name: "Lajpat Nagar" },
  { lat: 28.593480, lng: 77.023810, percentage: 71, name: "USICT" },
  { lat: 28.635, lng: 77.211, percentage: 69, name: "Daryaganj" },
];

// Function to get color based on fill percentage
function getColor(percentage) {
  return percentage < 50
    ? "#4CAF50" // Green
    : percentage < 75
    ? "#FFEB3B" // Yellow
    : "#F44336"; // Red
}

// Function to add dustbins to the map
function addDustbins(dustbins) {
  dustbins.forEach((dustbin) => {
    dustbin.marker = L.circleMarker([dustbin.lat, dustbin.lng], {
      radius: 12,
      fillColor: getColor(dustbin.percentage),
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    })
      .bindPopup(
        `<b>${dustbin.name}</b><br>Fill Percentage: ${dustbin.percentage}%`
      )
      .addTo(map);
  });
}

// Function to update bin list
function updateBinList(dustbins) {
  var topBins = dustbins
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10);
  var binList = document.getElementById("bin-list");
  binList.innerHTML = "";

  topBins.forEach((bin) => {
    var binItem = document.createElement("div");
    binItem.className = "bin-item";
    binItem.textContent = `${bin.name}`;
    binList.appendChild(binItem);
  });
}

// Add dustbins to the map
addDustbins(dustbins);

// Start collection button event listener
document.getElementById("start-collection").addEventListener("click", () => {
  var binList = document.getElementById("bin-list");
  var button = document.getElementById("start-collection");

  if (binList.classList.contains("hidden")) {
    binList.classList.remove("hidden");
    updateBinList(dustbins);
    button.textContent = "Close";
  } else {
    binList.classList.add("hidden");
    button.textContent = "Start Collection";
  }
});

// Focus on Delhi button event listener
document.getElementById("focus-delhi").addEventListener("click", function () {
  map.setView([28.6139, 77.209], 13); // Coordinates for Delhi
});

// Function to fetch and update the fill level
function fetchAndUpdateFillLevel() {
  // Fetch data from Blynk
  fetch(
    `https://blynk.cloud/external/api/get?token=4yFXy4OQ6q70rzh5HoTSlV3jP4mkbPB8&V0`
  )
    .then((response) => response.text())
    .then((data) => {
      const fillLevel = parseInt(data, 10); // Convert response to integer
      const maxLevel = 12; // Maximum level is 12 cm
      const fillPercentage = ((maxLevel - fillLevel) / maxLevel) * 100; // Calculate fill percentage
      const fillLevelDiv = document.getElementById("fill-level");
      const fillLevelValue = document.getElementById("fill-level-value");
      fillLevelValue.textContent = fillPercentage.toFixed(2) + '%'; // Update the fill percentage text

      const fillBar = document.getElementById("fill-bar");
      const fillBarHeight = fillPercentage; // The height of the fill bar as a percentage
      fillBar.style.height = fillBarHeight + "%"; // Update the fill bar height

      fillLevelDiv.classList.remove("hidden"); // Show the fill level

      // Update the specific dustbin's percentage
      const dustbinToUpdate = dustbins.find(
        (d) => d.name === "USICT"
      );
      if (dustbinToUpdate) {
        dustbinToUpdate.percentage = fillPercentage; // Set the variable percentage for USICT
        dustbinToUpdate.marker.setStyle({
          fillColor: getColor(fillPercentage),
        });
        dustbinToUpdate.marker.setPopupContent(
          `<b>${
            dustbinToUpdate.name
          }</b><br>Fill Percentage: ${fillPercentage.toFixed(2)}%`
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching fill level:", error);
    });
}

// Initial fetch and update
fetchAndUpdateFillLevel();

// Automatically fetch and update the fill level every 30 seconds
setInterval(fetchAndUpdateFillLevel, 1000); // Update every 30 seconds
