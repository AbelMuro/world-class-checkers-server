const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const path = require('path');
const ConvertMovesToSSN = require('./Utility/ConvertMovesToSSN');


router.post('/ai_move', (req, res) => {
    const {moves} = req.body;
    const allSSNMoves = ConvertMovesToSSN(moves);
 
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
                engine.stdin.write(`position startpos moves ${allSSNMoves}\n`);
                engine.stdin.write('go movetime 1000\n');
            }  
            else if(output.includes('bestmove')){
                const bestmove = output.slice(output.indexOf('bestmove'), output.length);
                res.status(200).send(bestmove);                    
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