// test_q4.js (DO NOT MODIFY THIS FILE)
//	  Windows: node test_q4.js > report.html && start report.html
//    Mac:     node test_q4.js > report.html && open report.html

// This is a SMALL self-check. Actual grading will use different tests.

const { findNextCoolerStops, findLongestCoolRoutes } = require("./q4");

// ---------- helpers ----------
function coordKey(rc) { return rc[0] + "," + rc[1]; }

function sortCoords(coords) {
  return coords.slice().sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
}

function coordsEqualUnordered(got, expected) {
  const g = sortCoords(got).map(coordKey);
  const e = sortCoords(expected).map(coordKey);
  if (g.length !== e.length) return false;
  for (let i = 0; i < g.length; i++) if (g[i] !== e[i]) return false;
  return true;
}

function routeKey(route) { return route.map(coordKey).join("|"); }

function routesEqualUnordered(gotRoutes, expectedRoutes) {
  const gset = new Set(gotRoutes.map(routeKey));
  const eset = new Set(expectedRoutes.map(routeKey));
  if (gset.size !== eset.size) return false;
  for (const k of eset) if (!gset.has(k)) return false;
  return true;
}

function show(obj) {
  if (Array.isArray(obj) && Array.isArray(obj[0]) && Array.isArray(obj[0][0])) {
    return showRoutes(obj);   // array of routes
  }
  return JSON.stringify(obj);
}

function showRoutes(routes) {
  return (
    "[\n" +
    routes.map(r => "  " + JSON.stringify(r)).join(",\n") +
    "\n]"
  );
}

function passFailHtml(pass) {
  return pass
    ? "<span style='color:green;font-weight:bold'>PASS</span>"
    : "<span style='color:red;font-weight:bold'>FAIL</span>";
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function runTests() {
  let passed = 0;
  let total = 0;
  const rows = [];

  function addTest(name, expected, actual, ok) {
    total++;
    if (ok) passed++;
    rows.push({ name, expected, actual, ok });
  }

  // ---------- Grid A ----------
  const gridA = [
    [7, 6, 5],
    [8, 7, 2],
    [9, 4, 3],
  ];

  // Part A (3 tests)
  addTest(
    "A1 next stops from (0,0)",
    [[0,1]],
    findNextCoolerStops(gridA, 0, 0),
    coordsEqualUnordered(findNextCoolerStops(gridA, 0, 0), [[0,1]])
  );

  addTest(
    "A2 next stops from (2,0)",
    [[1,0],[2,1]],
    findNextCoolerStops(gridA, 2, 0),
    coordsEqualUnordered(findNextCoolerStops(gridA, 2, 0), [[1,0],[2,1]])
  );

  addTest(
    "A3 next stops from (1,2)",
    [],
    findNextCoolerStops(gridA, 1, 2),
    coordsEqualUnordered(findNextCoolerStops(gridA, 1, 2), [])
  );

  // Part B (3 tests)
  const expectedRoutesA = [
    [[2,0],[1,0],[0,0],[0,1],[0,2],[1,2]],
    [[2,0],[1,0],[1,1],[0,1],[0,2],[1,2]],
    [[2,0],[1,0],[1,1],[2,1],[2,2],[1,2]],
  ];
  const gotRoutesA = findLongestCoolRoutes(gridA);
  addTest(
    "B1 longest routes for gridA (3 routes)",
    expectedRoutesA,
    gotRoutesA,
    routesEqualUnordered(gotRoutesA, expectedRoutesA)
  );

  const gridB = [
    [10, 9, 1],
    [ 8, 7, 2],
    [ 5, 6, 3],
  ];
  const expectedRoutesB = [
    [[0,0],[0,1],[1,1],[2,1],[2,2],[1,2],[0,2]],
    [[0,0],[1,0],[1,1],[2,1],[2,2],[1,2],[0,2]],
  ];
  const gotRoutesB = findLongestCoolRoutes(gridB);
  addTest(
    "B2 longest routes for gridB (2 routes)",
    expectedRoutesB,
    gotRoutesB,
    routesEqualUnordered(gotRoutesB, expectedRoutesB)
  );

  const gridC = [[42]];
  const expectedRoutesC = [[[0,0]]];
  const gotRoutesC = findLongestCoolRoutes(gridC);
  addTest(
    "B3 longest routes for 1x1",
    expectedRoutesC,
    gotRoutesC,
    routesEqualUnordered(gotRoutesC, expectedRoutesC)
  );

  // Render
  console.log("<h2>Sample Tests: Q4 Cool Routes (JavaScript)</h2>");
  console.log(`<p><strong>Result:</strong> ${passed}/${total} tests passed.</p>`);
  console.log("<table border='1' cellpadding='5' cellspacing='0'>");
  console.log("<tr><th>#</th><th>Test</th><th>Status</th><th>Expected</th><th>Actual</th></tr>");
  rows.forEach((t, i) => {
    console.log("<tr>");
    console.log(`<td>${i+1}</td>`);
    console.log(`<td>${t.name}</td>`);
    console.log(`<td>${passFailHtml(t.ok)}</td>`);
    console.log(`<td><pre>${escapeHtml(show(t.expected))}</pre></td>`);
    console.log(`<td><pre>${escapeHtml(show(t.actual))}</pre></td>`);
    console.log("</tr>");
  });
  console.log("</table>");
}

runTests();
