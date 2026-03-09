const express = require("express");

const router = express.Router();
const stocksController = require("../controllers/stocks-controller");

// Defines a route that handles GET requests to /display-data by delegating 
// the request to the displayForm function in the stockController.
router.get("/display-data", stocksController.displayForm);

// Defines a route that handles POST requests to /display-data by passing
// the request to the handleSubmission function in the stockController.
router.post("/display-data", stocksController.handleSubmission);

module.exports = router;
