const express = require('express');
require('dotenv').config();
const session = require("express-session");
const { v4 } = require("uuid")

const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json());

const oneDay = 60 * 60 * 1000 * 24;

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    genid: ()=>v4(),
    resave: true,
    rolling: true,
    cookie:{
        httpOnly: true,
        maxAge: oneDay,
        secure: false
    }
}))

app.get('/', (req, res)=>{
    console.log(req.session);
    const authorized = req.session?.authorized;
    if(authorized){
        res.send("Ok! you are logged in")
    }else{
        res.status(401).json({
            success: false,
            message: "login to access this page"
        })
    }
    
})

app.get("/login/:username/:pass", (req, res)=>{
    const { username, pass} = req.params;
    console.log(req.headers['user-agent']);


    if (username && pass) {
        req.session.authorized = true;
        req.session.user = username;
    }

    res.json(req.session)
})

app.get('/logout', (req, res)=>{
    req.session.destroy();
    res.send("Logout successfully")
})






app.use('/users', userRoutes)


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






const port = process.env.PORT || 4000;

app.listen(port, ()=>console.log(`Server on port: ${port}`))