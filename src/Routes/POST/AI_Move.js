const express = require('express');
const findBestMove = require('./Utility/CalculateBestMove');
const router = express.Router();

/* 
    this is where i left off, im getting the error 'circular reference'
    the issue is most likely coming from the recursive function 'findBestMove' -> 'getLegalMoves' function
    i may need to use JSON.stringify() 

*/

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
        const bestMove = findBestMove(board, 5, color);
        console.log(bestMove);
        res.status(200).json(bestMove);
    }
    catch(error){
        const message = error.message;
        console.log('Error: ', message)
        res.status(500).send(message);
    }

});

module.exports = router;