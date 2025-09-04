const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const path = require('path');
const ConvertToPDN = require('../../ChildProcess/Utility/ConvertToPDN');

/* 
    this is where i left off, i need to compile the stockfish-checkers engine repo 
    and get the .exe file that i can use to run a child process
*/


router.post('/ai_move', (req, res) => {
    const {board} = req.body;
    const PDN = ConvertToPDN(board);
 
    try{
        const enginePath = path.resolve(__dirname, '../../ChildProcess/CheckersEngine/MarcherEngine.exe');
        const child = spawn(enginePath);

        child.stdout.on('data', (data) => {
            console.log(`Output: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        child.on('close', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    }
    catch(error){
        const message = error.message;
        console.log('Error', message)
        res.status(500).send(message);
    }

})

module.exports = router;