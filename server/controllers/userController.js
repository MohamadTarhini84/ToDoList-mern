const User = require("../models/user")
const mongoose=require("mongoose")
const jwt=require('jsonwebtoken')
require('dotenv').config()

function handleErrors(error){
    console.log(error)
    let err={}
    if(error.code==11000){
        return error.message
    }
    try{
        Object.values(error.errors).forEach(({properties})=>{
            err[properties.path]=properties.message
        })
    } catch{
        err=error.message
    }

    return err
}

function createToken(id){
    return jwt.sign({_id:id},process.env.JWT_SECRET, {expiresIn: '3d'})
}

async function userSignup(userObj, res){ 
    try{
        const user =await User.signup(userObj.name, userObj.pass)
        const token=createToken(user._id)
        const name=user.username
        
        res.status(200).json({token,name})
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
}

async function userLogin(userObj, res){
    try{
        const user =await User.login(userObj.name, userObj.pass)
        const token=createToken(user._id)
        const name=user.username

        res.status(200).json({token,name})
    } catch (error){
        const errors= handleErrors(error)
        res.status(401).json({errors})
    }
}

module.exports = {userSignup, userLogin};