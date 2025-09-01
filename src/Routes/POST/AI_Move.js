const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
const path = require('path');
const ConvertToPDN = require('../../ChildProcess/Utility/ConvertToPDN');


/* 
    this is where i left off, 
     i need to test out the child process running the checkers engine here
*/

router.post('/ai_move', (req, res) => {
    const {board} = req.body;
    const PDN = ConvertToPDN(board);

    try{
        const enginePath = path.resolve(__dirname, '../../ChildProcess/CheckersEngine/Main.exe');      
        const engine = spawn(enginePath, ['-pdn', PDN]);
        let output = '';

        engine.stdout.on('data', (data) => {        //reading the data from the engine
            console.log('data collected')
            output += data.toString();
        })

        engine.stdout.on('end', () => {             //once the engine finishes, we send the result as a response to the front end
            console.log('finished reading data')
            res.status(200).send(output.trim());
        })

        engine.stderr.on('data', (error) => {       // we handle errors here
            console.error('Engine error:', error.toString());
            res.status(501).send(error.toString());
        });

        engine.on('close', (code) => {
            console.log(`Engine exited with code ${code}`);
        });
    }
    catch(error){
        const message = error.message;
        console.log('Error', message)
        res.status(500).send(message);
    }

})

module.exports = router;