// Week 5 - Extra Question 8 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

const driversProfiles = {
  "Max Verstappen": { "team": "Red Bull Racing", "country": "Netherlands"},
  "Sergio Perez": { "team": "Red Bull Racing", "country": "Mexico"},
  "Charles Leclerc": { "team": "Ferrari", "country": "Monaco"},
  "Carlos Sainz": { "team": "Ferrari", "country": "Spain"},
  "Mick Schumacher": {"team": "Mercedes", "country": "Germany"},
  "Lewis Hamilton": {"team": "Mercedes", "country": "United Kingdom"}
}

const countryFlags = {
  "Netherlands": "🇳🇱",
  "Mexico": "🇲🇽",
  "Monaco": "🇲🇨",
  "Spain": "🇪🇸",
  "Germany": "🇩🇪",
  "United Kingdom": "🇬🇧"
};

// START YOUR CODE HERE

// Handle GET request to '/
server.get('/', (req, res) => {
  const driversNames = Object.keys(driversProfiles);
  res.render('f1', { driversNames, selectedDriversNames: [], message: '' });  
});

// Handle POST request to /process
server.post('/process', (req, res) => { 
  const driversNames = Object.keys(driversProfiles);
  const selectedDriversNames = req.body.drivers || [];
  let message = '';

  // Validate selected drivers
  if (!Array.isArray(selectedDriversNames)) {
    selectedDriversNames = [ selectedDriversNames ]; // Convert to array if only one driver is selected
  }
  if (selectedDriversNames.length === 0) {
    message = '<h3>Error</h3>No winner selected.';
  } else {
    message = '<h3>Winners List</h3>';
    selectedDriversNames.forEach(driverName => {
      // Retrieve driver profile
      const driverProfile = driversProfiles[driverName];
      // retrieve country Flags
      const flag = countryFlags[driverProfile.country] || '';
      // Append driver information to message
      message += `Driver: ${driverName} - Team: ${driverProfile.team}, Country: ${flag} ${driverProfile.country}<br>`;
    });
  }

  // Render the f1 view with the selected drivers and message
  res.render('f1', { driversNames, selectedDriversNames, message });
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
