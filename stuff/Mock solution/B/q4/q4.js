/* 
    Name:  
    Email: 
*/

// q4.js (SOLUTION)

function findNextCoolerStops(grid, gridRow, gridCol) {
  const n = grid.length;
  const m = (n === 0) ? 0 : grid[0].length;

  if (gridRow < 0 || gridRow >= n || gridCol < 0 || gridCol >= m) {
    return [];
  }

  const cur = grid[gridRow][gridCol];
  const out = [];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dr, dc] of dirs) {
    const nr = gridRow + dr;
    const nc = gridCol + dc;
    if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
      if (grid[nr][nc] < cur) out.push([nr, nc]);
    }
  }
  return out;
}

function findLongestCoolRoutes(grid) {
  const n = grid.length;
  const m = (n === 0) ? 0 : grid[0].length;
  if (n === 0 || m === 0) return [];

  // memo tables
  const bestLen = Array.from({ length: n }, () => Array(m).fill(0));
  const bestNext = Array.from({ length: n }, () => Array.from({ length: m }, () => []));

  function dp(r, c) {
    if (bestLen[r][c] !== 0) return bestLen[r][c];

    const nexts = findNextCoolerStops(grid, r, c);
    if (nexts.length === 0) {
      bestLen[r][c] = 1;
      bestNext[r][c] = [];
      return 1;
    }

    let maxChild = 0;
    for (const [nr, nc] of nexts) {
      const child = dp(nr, nc);
      if (child > maxChild) maxChild = child;
    }

    const winners = [];
    for (const [nr, nc] of nexts) {
      if (bestLen[nr][nc] === maxChild) winners.push([nr, nc]);
    }

    bestLen[r][c] = 1 + maxChild;
    bestNext[r][c] = winners;
    return bestLen[r][c];
  }

  let globalMax = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      const L = dp(r, c);
      if (L > globalMax) globalMax = L;
    }
  }

  const starts = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (bestLen[r][c] === globalMax) starts.push([r, c]);
    }
  }

  const routes = [];
  function build(r, c, path) {
    path.push([r, c]);
    const nexts = bestNext[r][c];
    if (!nexts || nexts.length === 0) {
      routes.push(path.slice());
    } else {
      for (const [nr, nc] of nexts) build(nr, nc, path);
    }
    path.pop();
  }

  for (const [sr, sc] of starts) build(sr, sc, []);
  return routes;
}

module.exports = {
  findNextCoolerStops,
  findLongestCoolRoutes,
};
