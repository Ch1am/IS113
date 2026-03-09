/* 
    Name:  
    Email: 
*/

// q4.js (TO BE COMPLETED)
// You may add helper functions if you wish.

/**
 * Return all neighbouring coordinates you can move to from (gridRow, gridCol),
 * i.e., up/down/left/right neighbours with STRICTLY lower values.
 *
 * @param {number[][]} grid
 * @param {number} gridRow
 * @param {number} gridCol
 * @returns {number[][]} array of [r,c] pairs (order does not matter)
 */
function findNextCoolerStops(grid, gridRow, gridCol) {
  // TODO
  return [];
}

/**
 * Find ALL longest valid routes anywhere in the grid (there may be more than one),
 * where each move goes to a STRICTLY lower value and moves are up/down/left/right.
 *
 * Return format: array of routes, where each route is an array of [r,c] pairs
 * in visiting order. Order of routes does not matter, but order within a route matters.
 *
 * @param {number[][]} grid
 * @returns {number[][][]} array of routes
 */
function findLongestCoolRoutes(grid) {
  // TODO
  return [];
}

module.exports = {
  findNextCoolerStops,
  findLongestCoolRoutes,
};
