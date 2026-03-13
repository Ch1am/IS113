const express = require('express');

const router = express.Router(); // sub application

router.get('/', (req, res) => {
    res.send('hello from books-routes')
})

// EXPORT
module.exports = router;