// Week 5 - Extra Question 9 Solution - server.js
// ----------------------------------------------

const express = require('express');
const server = express();

const hostname = 'localhost';
const port = 8000;

server.set("view engine", "ejs");

// Parse URL-encoded data from POST requests
server.use(express.urlencoded());

// Define activities and their costs
const activityProfiles = { "Fireworks" : "Free",
                     "Culture Show" : "Free",
                     "Street Food" : 20,
                     "Lantern Painting" : 25,
                     "Tea Appreciation" : 2 };

// START YOUR CODE HERE

// Handle GET request to '/'
server.get('/', (req, res) => {
  const activityList = Object.keys(activityProfiles);
  res.render('festive', { activityList, selectedActivities: [], selectedFilterFree: '', message: '' });
});

// Handle POST request to '/process'
server.post('/process', (req, res) => { 
  const activityList = Object.keys(activityProfiles);
  let selectedActivities = req.body.activities || [];
  const selectedFilterFree = req.body.filterFree;
  let activityToDisplayList = [];
  let message = '';

  // Validate selected activities
  if (selectedActivities.length === 0) {
    message = '<h3>Result</h3>Please select at least one activity.';
  } else {
      if (!Array.isArray(selectedActivities)) {
        // Convert to array if only one activity
        selectedActivities = [ selectedActivities ]; 
      } 
      if (selectedFilterFree) {
        selectedActivities.forEach(activity => {
          if (activityProfiles[activity] === "Free") {
            activityToDisplayList.push(activity);
          }
        });
      } else {
        activityToDisplayList = selectedActivities;
      }
      // Display result
      if (activityToDisplayList.length == 0) {
        message = `<h3>Results</h3>No activity.`;
      } else {
        message = `<table border=1><tr><th>Activity</th><th>Cost</th></tr>`;
        activityToDisplayList.forEach(activity => {
          message += `<tr><td>${activity}</td> <td>${activityProfiles[activity]}</td></tr>`;
        });
        message += '</table>';
      }
    }
  // Render the festive view with the results
  res.render('festive', { activityList, selectedActivities, selectedFilterFree, message });
});

// END YOUR CODE HERE

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
