const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const path = require('path');
const ConvertToFen = require('./Utility/ConvertToFen');
const ConvertAlgebraicToCheckers = require('./Utility/ConvertAlgebraicToCheckers');

/*
    this is where i left off, i need to use another checkers engine to calculate the best move

*/

router.post('/ai_move', (req, res) => {
    const {board} = req.body;
    const FEN = ConvertToFen(board);
 
    try{
        const enginePath = path.resolve(__dirname, './../../ChildProcess/CheckersEngine/stockfishWindows.exe');
        const engine = spawn(enginePath);

        engine.stdin.write('uci\n');
        engine.stdin.write('isready\n');    

        engine.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(output)
            if(output.includes('readyok')){
                engine.stdin.write(`position B:W12,13,14,15:B1,2,3,4\n`);
                engine.stdin.write('go movetime 1000\n');
            }  
            else if(output.includes('bestmove')){
                const bestmoveOutput = output.slice(output.indexOf('bestmove'), output.length);
                const bestmove = bestmoveOutput.split(' ')[1];
                const checkersSquare = ConvertAlgebraicToCheckers(bestmove);
                res.status(200).send(checkersSquare);                    
            }
        });

        engine.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            res.status(501).send(data);
        });

        engine.on('close', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    }
    catch(error){
        const message = error.message;
        console.log('Error: ', message)
        res.status(500).send(message);
    }

})

module.exports = router;