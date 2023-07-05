const express = require('express');
require('dotenv').config();

const booksrouter = require('./routes/booksRoute')
const authorize = require("./middlewares/authorize")

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    console.log(req.session);
    res.send("Books service Ok")
})

app.use(authorize);
app.use('/books', booksrouter)

app.use("*", (req, res, next)=>{
    const error =  new Error("Route not found");
    next({
        status:404,
        message: error.message
    })
})

app.use((error, req, res, next )=>{
    res.status(error.status).json(error.message)
})






const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server on port: ${port}`))