// grading_q4.js (Auto-Grader)
// Run with: 
//	  Windows: node grading_q4.js > report.html && start report.html
//    Mac:     node grading_q4.js > report.html && open report.html
// Note: This script is designed so that an "empty skeleton" implementation
// (returning [] everywhere) should NOT pass any test cases.

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

// Pretty: one route per line (keeps each route compact)
function show(obj) {
  if (Array.isArray(obj) && Array.isArray(obj[0]) && Array.isArray(obj[0][0])) {
    return (
      "[\n" +
      obj.map(r => "  " + JSON.stringify(r)).join(",\n") +
      "\n]"
    );
  }
  return JSON.stringify(obj);
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

  // -------------------- Grid D --------------------
  // 9  6  5
  // 8  7  4
  // 3  2  1
  const gridD = [
    [9, 6, 5],
    [8, 7, 4],
    [3, 2, 1],
  ];

  // Part A (3 tests) - all expected results are NON-empty
  addTest(
    "A1 next stops from (0,0)=9",
    [[1, 0], [0, 1]],
    findNextCoolerStops(gridD, 0, 0),
    coordsEqualUnordered(findNextCoolerStops(gridD, 0, 0), [[1, 0], [0, 1]])
  );

  addTest(
    "A2 next stops from (1,1)=7",
    [[0, 1], [1, 2], [2, 1]],
    findNextCoolerStops(gridD, 1, 1),
    coordsEqualUnordered(findNextCoolerStops(gridD, 1, 1), [[0, 1], [1, 2], [2, 1]])
  );

  // was previously an empty-expected test; replaced to avoid skeleton passing any test
  addTest(
    "A3 next stops from (2,0)=3",
    [[2, 1]],
    findNextCoolerStops(gridD, 2, 0),
    coordsEqualUnordered(findNextCoolerStops(gridD, 2, 0), [[2, 1]])
  );

  // Part B (3 tests)
  const expectedRoutesD = [
    [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
  ];
  const gotRoutesD = findLongestCoolRoutes(gridD);
  addTest(
    "B1 longest routes for gridD (2 routes, length 5)",
    expectedRoutesD,
    gotRoutesD,
    routesEqualUnordered(gotRoutesD, expectedRoutesD)
  );

  // -------------------- Grid E --------------------
  // 5 4
  // 3 2
  // 1 0
  const gridE = [
    [5, 4],
    [3, 2],
    [1, 0],
  ];
  const expectedRoutesE = [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
  ];
  const gotRoutesE = findLongestCoolRoutes(gridE);
  addTest(
    "B2 longest routes for gridE (2 routes, length 4)",
    expectedRoutesE,
    gotRoutesE,
    routesEqualUnordered(gotRoutesE, expectedRoutesE)
  );

  // -------------------- Grid G (single unique longest route) --------------------
  // 9 8 7
  // 6 5 4
  // 3 2 1
  // Unique longest route is length 9 starting at (0,0) and going "snake":
  // (0,0)->(0,1)->(0,2)->(1,2)->(1,1)->(1,0)->(2,0)->(2,1)->(2,2)
  const gridG = [
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1],
  ];
  const expectedRoutesG = [
    [[0, 0], [0, 1], [0, 2], [1, 2], [1, 1], [1, 0], [2, 0], [2, 1], [2, 2]],
  ];
  const gotRoutesG = findLongestCoolRoutes(gridG);
  addTest(
    "B3 longest routes for gridG (unique route, length 9)",
    expectedRoutesG,
    gotRoutesG,
    routesEqualUnordered(gotRoutesG, expectedRoutesG)
  );

  // Render HTML (redirect to a file if you want to view in a browser)
  console.log("<h2>Extra Practice Tests: Q4 Cool Routes (JavaScript)</h2>");
  console.log(`<p><strong>Result:</strong> ${passed}/${total} tests passed.</p>`);
  console.log("<p>Tip: view in browser: <code>node sample_test_q4_extra.js &gt; report.html</code> then open report.html</p>");
  console.log("<table border='1' cellpadding='5' cellspacing='0'>");
  console.log("<tr><th>#</th><th>Test</th><th>Status</th><th>Expected</th><th>Actual</th></tr>");

  rows.forEach((t, i) => {
    console.log("<tr>");
    console.log(`<td>${i + 1}</td>`);
    console.log(`<td>${t.name}</td>`);
    console.log(`<td>${passFailHtml(t.ok)}</td>`);
    console.log(`<td><pre>${escapeHtml(show(t.expected))}</pre></td>`);
    console.log(`<td><pre>${escapeHtml(show(t.actual))}</pre></td>`);
    console.log("</tr>");
  });

  console.log("</table>");
}

runTests();
