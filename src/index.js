const express = require('express');
const aiMove = require('./Routes/POST/AI_Move.js');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json());
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