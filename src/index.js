const express = require('express');
const aiMove = require('./Routes/POST/AI_Move.js');
const cors = require('cors');
const app = express();
const port = 4000;

const allowedOrigins = [
    'https://world-class-checkers.netlify.app'
]

/* 
    (origin, callback) => {
            const cleanedOrigin = origin?.endsWith('/') ? origin.slice(0, origin.length - 2) : origin;
            if(allowedOrigins.includes(cleanedOrigin))
                callback(null, true)
            else
                callback(new Error('Not allowed by CORS'));

        }
*/

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
}))

app.use(aiMove);


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, (error) => {
    if(error){
        console.log(error, 'error occurred');
        return;
    }
    console.log(`Server is running on port ${port}`);
})

module.exports = app;