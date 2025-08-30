const express = require('express');
const router = express.Router();

router.post('/ai_move', (req, res) => {
    console.log('hello fetch request')
})

module.exports = router;