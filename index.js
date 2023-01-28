// import express inside index.js
const express = require('express')

// import cors in index.js
const cors = require('cors')

// import dataservice
const dataService = require('./services/dataservice')

// create server app using express
const server = express()

// use cors
server.use(cors({
    origin:'http://localhost:4200'
}))

// to parse json data
server.use(express.json())

// set up port for server app
server.listen(3000,()=>{
    console.log('server started at 3000');
})

// application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('Inside application specific middleware');
    next()
}

server.use(appMiddleware)
// bankapp front end request resolving

// token verify middleware
const jwtMiddlewarre =(req,res,next)=>{
    console.log('Inside router specific middleware');
    // get token from req headers
    const token = req.headers['access-token']
    console.log(token);
   try {// verify token
    const data = jwt.verify(token,'secretkey123')
    console.log('Valid Token');
    next()
    }
    catch{
        console.log('Invalid token');
        res.status(401).json({
            message:'Please Login!!'
        })
    }
}

// register api call resolving
server.post('/register',(req,res)=>{
    console.log('Inside register function');
    console.log(req.body);
    // asynchronous
    dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})
// login api call resolving
server.post('/login',(req,res)=>{
    console.log('Inside login function');
    console.log(req.body);
    // asynchronous
    dataService.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// getBalance
server.get('/getBalance/:acno',jwtMiddlewarre ,(req,res)=>{
    console.log('Inside getBalance Api');
    console.log(req.params.acno);
    // asynchronous
    dataService.getBalance(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})