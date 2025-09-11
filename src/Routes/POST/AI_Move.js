const express = require('express');
const findBestMove = require('./Utility/CalculateBestMove');
const router = express.Router();

router.post('/ai_move', (req, res) => {
    const {board, color, difficulty} = req.body;
    let depth;

    if(difficulty === 'easy')
        depth = 3;
    else if(difficulty === 'medium')
        depth = 5;
    else
        depth = 7;

    try{
        const bestMove = findBestMove(board, depth, color);
        res.status(200).json(bestMove);
    }
    catch(error){
        const message = error.message;
        console.log('Error: ', message)
        res.status(500).send(message);
    }

});

module.exports = router;