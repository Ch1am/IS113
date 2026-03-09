// test_q4.js (DO NOT MODIFY THIS FILE)
// Run with: node test_q4.js
// Tip (macOS):    node test_q4.js > report.html && open report.html
// Tip (Windows):  node test_q4.js > report.html && start report.html

const { allocateRides } = require("./q4");

// ---------- helpers ----------
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

function pretty(obj) {
    return JSON.stringify(obj, null, 2);
}

function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function run() {
    let passed = 0;
    let total = 0;
    const rows = [];

    function addTest(name, drivers, requests, expected) {
        total++;
        const got = allocateRides(drivers, requests);
        const ok = deepEqual(got, expected);
        if (ok) passed++;
        rows.push({ name, expected, got, ok });
    }

    // ---------- TC1 ----------
    addTest(
        "TC1 basic two requests",
        [
            { id: 1, x: 0, y: 0, availableAt: 0 },
            { id: 2, x: 5, y: 5, availableAt: 0 },
        ],
        [
            { id: 101, x: 1, y: 1, requestedAt: 0 },
            { id: 102, x: 6, y: 6, requestedAt: 1 },
        ],
        [
            { requestId: 101, driverId: 1, eta: 2, waitTime: 2, emptyDistance: 2 },
            { requestId: 102, driverId: 2, eta: 3, waitTime: 2, emptyDistance: 2 },
        ]
    );

    // ---------- TC2 ----------
    addTest(
        "TC2 tie-break by driverId",
        [
            { id: 1, x: 0, y: 0, availableAt: 0 },
            { id: 2, x: 0, y: 2, availableAt: 0 },
            { id: 3, x: 2, y: 0, availableAt: 0 },
        ],
        [
            { id: 201, x: 1, y: 1, requestedAt: 0 },
        ],
        [
            { requestId: 201, driverId: 1, eta: 2, waitTime: 2, emptyDistance: 2 },
        ]
    );

    // ---------- TC3 ----------
    addTest(
        "TC3 busy driver still best",
        [
            { id: 1, x: 0, y: 0, availableAt: 10 },
            { id: 2, x: 10, y: 10, availableAt: 0 },
        ],
        [
            { id: 301, x: 1, y: 1, requestedAt: 0 },
        ],
        [
            { requestId: 301, driverId: 1, eta: 12, waitTime: 12, emptyDistance: 2 },
        ]
    );

    // ---------- TC4 ----------
    addTest(
        "TC4 skip one request, serve later",
        [
            { id: 1, x: 0, y: 0, availableAt: 0 },
            { id: 2, x: 20, y: 20, availableAt: 0 },
        ],
        [
            { id: 401, x: 2, y: 2, requestedAt: 0 },
            { id: 402, x: 40, y: 40, requestedAt: 1 },
            { id: 403, x: 3, y: 3, requestedAt: 2 },
        ],
        [
            { requestId: 401, driverId: 1, eta: 4, waitTime: 4, emptyDistance: 4 },
            { requestId: 403, driverId: 1, eta: 6, waitTime: 4, emptyDistance: 2 },
        ]
    );

    // ---------- Render ----------
    console.log("<h2>Q4 Rideshare Allocator – Student Tests</h2>");
    console.log(`<p><strong>Result:</strong> ${passed}/${total} tests passed.</p>`);
    console.log("<table border='1' cellpadding='6' cellspacing='0'>");
    console.log("<tr><th>#</th><th>Test</th><th>Status</th><th>Expected</th><th>Actual</th></tr>");

    rows.forEach((t, i) => {
        console.log("<tr>");
        console.log(`<td>${i + 1}</td>`);
        console.log(`<td>${escapeHtml(t.name)}</td>`);
        console.log(`<td>${passFailHtml(t.ok)}</td>`);
        console.log(`<td><pre>${escapeHtml(pretty(t.expected))}</pre></td>`);
        console.log(`<td><pre>${escapeHtml(pretty(t.got))}</pre></td>`);
        console.log("</tr>");
    });

    console.log("</table>");
}

run();