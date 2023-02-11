const User=require('../models/user')
const mongoose=require('mongoose')
const Task=mongoose.model("task",require('../models/task'))

function handleErrors(error){
    let err={}

    if(error.code==11000){
        err['title']="This task already exists"
        return err
    }
    if(error){
        console.log(error)
        // Object.values(error).forEach(({properties})=>{
        //     err[properties.path]=properties.message
        // })
    }

    return err
}

async function addTask(userId,myTask,res){
    try{
        const task= new Task(myTask)
        const valErr=task.validateSync()
        if (valErr) {
            res.status(400).json(valErr.message)
            return
        } 
        const user=await User.findOneAndUpdate({_id:new mongoose.Types.ObjectId(userId)},{$push: {tasks:task}},{new:true})
        res.status(200).json(user)
    } catch(errors){
        const error=handleErrors(errors)
        res.status(400).json(error)
    }
}

async function getTasks(userId,res){
    try{
        const data=await User.find({_id:new mongoose.Types.ObjectId(userId)})
        res.status(200).json(data)
    } catch(errors){
        const error=handleErrors(errors)
        res.status(400).json(error)
    }
}

async function deleteTask(userId, taskId, res){
    try{
        const user=await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)},
            {$pull: {tasks:{_id:mongoose.Types.ObjectId(taskId)}}},{new:true})
        res.json(user)
    }catch(errors){
        const error=handleErrors(errors)
        res.status(400).json(error)
    }
}

module.exports={getTasks, addTask, deleteTask}