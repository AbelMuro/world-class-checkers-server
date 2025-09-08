const express = require('express');
const findBestMove = require('./Utility/CalculateBestMove');
const router = express.Router();

router.post('/ai_move', (req, res) => {
    const {board} = req.body;

    try{
        const bestMove = findBestMove(board, 5, 'black');
        console.log(bestMove);
        res.status(200).json(bestMove);
    }
    catch(error){
        const message = error.message;
        console.log('Error: ', message)
        res.status(500).send(message);
    }

})

module.exports = router;