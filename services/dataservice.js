// import db.js
const db = require('./db')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// register
const register =(uname,acno,pswd)=>{
    console.log('Inside register Function in data service');
    // asynchronous function
    // check acno is in mongodb- db.users.findOne()
   return db.User.findOne({
        acno
    }).then((result)=>{
        console.log(result);
        if(result){
            // acno already exist
            return{
                statusCode:403,
                message:'Account Already exist!!'
            }
        }
        else{
            // to add new user
            const newUser = new db.User({
                username:uname,
                acno,
                password:pswd,
                balance:0,
                transaction:[]
            })
            // to save new user in mongodb use save()
            newUser.save()
            return{
                statusCode:200,
                message:'Registration successfull...'
            }
        }
    })
}

// login
const login = (acno,pswd)=>{
    console.log('Inside login function body');
return db.User.findOne({
    acno,
    password:pswd
}).then((result)=>{
    if(result){
        // generate token
        const token = jwt.sign({
            currentAcno:acno
        },'secretkey123')
        return{
            statusCode:200,
            message:'Login successfull...',
            username:result.username,
            currentAcno:acno,
            token
        }
        
    }
    else{
        return{
            statusCode:404,
            message:'Invalid Account / Password'
        }
    }
}
)
}

// getBalance
const getBalance =(acno)=>{
   return db.User.findOne({
        acno
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                balance:result.balance
            }
        }
        else{
            return{
                statusCode:404,
                message:'Invalid Account'
            }
        }
    })
}

// export
module.exports={
    register,
    login,
    getBalance
}
