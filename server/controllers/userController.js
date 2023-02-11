const User = require("../models/user")
const mongoose=require("mongoose")

function handleErrors(error){
    let err={}

    if(error.code==11000){
        err['username']="This username already exists"
        return err
    }

    Object.values(error.errors).forEach(({properties})=>{
        err[properties.path]=properties.message
    })

    return err
}

async function userSignup(userObj, res){ 
    try{
        const user = await User.create(userObj)
        res.status(201).json(user)
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
}

async function userLogin(userObj){
    console.log(userObj)
}

module.exports = {userSignup, userLogin};