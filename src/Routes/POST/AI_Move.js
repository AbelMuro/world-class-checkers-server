const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const path = require('path');
const ConvertToFen = require('./Utility/ConvertToFen');
const ConvertAlgebraicToCheckers = require('./Utility/ConvertAlgebraicToCheckers');

/*
    this is where i left off, i need to continue to find a way to use stockfish for a checkers match

*/

router.post('/ai_move', (req, res) => {
    const {board} = req.body;
    const FEN = ConvertToFen(board);
    console.log(FEN)
 
    try{
        const enginePath = path.resolve(__dirname, './../../ChildProcess/CheckersEngine/stockfishWindows.exe');
        const engine = spawn(enginePath);

        engine.stdin.write('uci\n');
        engine.stdin.write('setoption name Skill Level value 5\n');     //0 easiest, 20 strongest
        engine.stdin.write('isready\n');    

        engine.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(output)
            if(output.includes('readyok')){
                engine.stdin.write(`position ${FEN}\n`);
                engine.stdin.write('go movetime 1000\n');
            }  
            else if(output.includes('bestmove')){
                const bestmoveOutput = output.slice(output.indexOf('bestmove'), output.length);
                const bestmove = bestmoveOutput.split(' ')[1];
                const checkersSquare = `${ConvertAlgebraicToCheckers(bestmove[0], Number(bestmove[1]))} ${ConvertAlgebraicToCheckers(bestmove[2], Number(bestmove[3]))}`
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