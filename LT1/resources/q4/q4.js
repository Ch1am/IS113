/* 
    Name: Marcus Chiam Hao Yi
  Email: marcuschiam.2025
*/

// q4.js (Modify this file)
// You must implement allocateRides(drivers, requests)

function allocateRides(drivers, requests) {
  // drivers: array of { id, x, y, availableAt }
  // requests: array of { id, x, y, requestedAt }

  // TODO:
  // 1) Process requests in ascending requestedAt, then by id
  // 2) For each request, choose the best driver using:
  //    - smallest waitTime
  //    - then smallest emptyDistance
  //    - then smallest driverId
  // 3) Skip a request if best waitTime > 15
  // 4) Update chosen driver's location and availableAt
  // 5) Return an array of assignment objects

  return [];
}

// Export for Node.js
if (typeof module !== "undefined") {
  module.exports = { allocateRides };
}