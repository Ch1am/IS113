/* 
    Name:  
    Email: 
*/

// routes/q3b.js (SOLUTION)
const express = require("express");
const router = express.Router();

/*
  A list of all available transport options.
  Each option has:
    - id    : the value sent by the form
    - label : text shown to the user
    - img   : image file name
*/
const TRANSPORTS = [
  { id: "bus", label: "Bus", img: "bus.png" },
  { id: "train", label: "Train", img: "train.png" },
  { id: "taxi", label: "Taxi", img: "taxi.png" },
];

/*
  normalizeToArray(v)

  Problem this solves:
  -------------------
  When form data comes from checkboxes:
    - if NO box is checked → value is undefined
    - if ONE box is checked → value is a string
    - if MANY boxes are checked → value is an array

  This function forces all three cases to become an array,
  so the rest of our code can assume:
    "I am always working with an array"
*/
function normalizeToArray(v) {
  // If nothing was submitted, return an empty array
  if (v === undefined || v === null) return [];

  // If v is already an array, return it as-is
  // Otherwise, wrap the single value in an array
  return Array.isArray(v) ? v : [v];
}

/*
  GET request: show the page for the first time
  No transport is selected yet, so selectedIds is empty
*/
router.get("/q3b-one", (req, res) => {
  res.render("q3b-one", {
    transports: TRANSPORTS,
    selectedIds: [],
    count: 0,
    selectedTransports: []
  });
});

/*
  POST request: form has been submitted
*/
router.post("/q3b-one", (req, res) => {

  /*
    Step 1: Get selected transport values from the form

    req.body.transport might be:
      - undefined
      - "bus"
      - ["bus", "train"]

    normalizeToArray() guarantees an array:
      [] or ["bus"] or ["bus", "train"]
  */
  const selectedRaw = normalizeToArray(req.body.transport);

  /*
    Step 2: Build a Set of all valid transport IDs

    TRANSPORTS.map(t => t.id) does this:
      [
        { id: "bus", ... },
        { id: "train", ... },
        { id: "taxi", ... }
      ]
      ↓
      ["bus", "train", "taxi"]

    new Set(...) creates a collection of UNIQUE values
    and allows very fast membership checks using .has()
  */
  const allowed = new Set(
    TRANSPORTS.map(t => t.id)
  );

  /*
    Step 3: Filter the submitted values

    selectedRaw.filter(...) keeps ONLY values that:
      - exist in the allowed Set

    allowed.has(id) returns:
      - true  → keep it
      - false → discard it

    This protects us from:
      - invalid form values
      - tampered requests
  */
  const selectedIds = selectedRaw.filter(id => allowed.has(id));
  const count = selectedIds.length;
    
  /*
    Step 4: Convert IDs into full transport objects

    We now filter the TRANSPORTS array and keep only those
    objects whose id appears in selectedIds.

    This gives us full objects like:
      { id: "bus", label: "Bus", img: "bus.png" }

    instead of just strings like "bus".
  */
  const selectedTransports = TRANSPORTS.filter(
    t => selectedIds.includes(t.id)
  );

  /*
    Step 5: Render the page again
    Pass back:
      - all transport options
      - the validated selected IDs
      - the number of selected IDs
      - the selected transports (full objects)
  */
  res.render("q3b-one", {
    transports: TRANSPORTS,
    selectedIds,
    count,
    selectedTransports
  });
});
module.exports = router;
