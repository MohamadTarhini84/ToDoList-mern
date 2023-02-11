const dbConnect=require('./db')
const express=require('express')
const {getTasks, addTask, deleteTask}=require('../controllers/taskController')
const {userLogin, userSignup}=require('../controllers/userController')

const app=express()
app.use(express.json())
dbConnect(app)

app.get('/users/:userId',(req,res)=>{
    getTasks(req.params.userId,res)
})

app.post('/users/:userId',(req,res)=>{
    addTask(req.params.userId,req.body,res)
})

app.delete('/users/:userId/tasks/:taskId',(req,res)=>{
    deleteTask(req.params.userId, req.params.taskId,res)
})

app.post('/login', (req,res)=>{
    userLogin(req.body)
    res.send({status:"200"})
})

app.post('/signup', (req,res)=>{
    userSignup(req.body, res)
})

