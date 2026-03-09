/* 
    Name:  
    Email: 
*/

// routes/q3a.js (SOLUTION)

const express = require("express");
const router = express.Router();

/*
  List of all available transport options.
  This is our "source of truth".

  Each object represents one option the user can choose.
*/
const TRANSPORTS = [
  { id: "bus", label: "Bus", img: "bus.png" },
  { id: "train", label: "Train", img: "train.png" },
  { id: "taxi", label: "Taxi", img: "taxi.png" },
];

/*
  normalizeToArray(v)

  Why this function exists:
  -------------------------
  Checkbox form data behaves inconsistently:

    - If NO checkbox is checked:
        req.body.transport === undefined

    - If ONE checkbox is checked:
        req.body.transport === "bus"   (a string)

    - If MULTIPLE checkboxes are checked:
        req.body.transport === ["bus", "train"]  (an array)

  This function converts ALL cases into an array so that
  the rest of the code does not need special cases.
*/
function normalizeToArray(v) {
  // Nothing selected → empty array
  if (v === undefined || v === null) return [];

  // If already an array, keep it.
  // Otherwise, wrap the single value in an array.
  return Array.isArray(v) ? v : [v];
}

/*
  Handle POST request from the checkbox form
*/
router.post("/q3a-display", (req, res) => {

  /*
    Step 1: Get selected transport IDs from the form
    After normalization, this is ALWAYS an array of strings.

    Examples:
      []                    (nothing selected)
      ["bus"]               (one selected)
      ["bus", "train"]      (multiple selected)
  */
  const selectedRaw = normalizeToArray(req.body.transport);

  /*
    Step 2: Create a Set of allowed transport IDs

    TRANSPORTS.map(t => t.id) transforms:
      [
        { id: "bus", ... },
        { id: "train", ... },
        { id: "taxi", ... }
      ]
    into:
      ["bus", "train", "taxi"]

    new Set(...) stores these IDs in a collection that:
      - contains only unique values
      - allows fast membership checks using .has()
  */
  const allowed = new Set(
    TRANSPORTS.map(t => t.id)
  );

  /*
    Step 3: Validate the submitted values

    filter(...) keeps ONLY IDs that are in the allowed Set.

    allowed.has(id):
      - returns true  → value is valid
      - returns false → value is invalid (discarded)

    This protects the server from:
      - tampered form submissions
      - unexpected values
  */
  const selectedIds = selectedRaw.filter(id => allowed.has(id));

  /*
    Step 4: Convert IDs into full transport objects

    We now filter the TRANSPORTS array and keep only those
    objects whose id appears in selectedIds.

    This gives us full objects like:
      { id: "bus", label: "Bus", img: "bus.png" }

    instead of just strings like "bus".
  */
  const selected = TRANSPORTS.filter(
    t => selectedIds.includes(t.id)
  );

  /*
    Step 5: Render the result page
    We pass only the selected transport objects to the view.
  */
  res.render("q3a-display", { selected });
});

module.exports = router;
