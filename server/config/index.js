const dbConnect=require('./db')
const express=require('express')
const {getTasks, addTask, deleteTask}=require('../controllers/taskController')
const {userLogin, userSignup}=require('../controllers/userController')
const Auth=require('../middleware/requireAuth')

const app=express()
app.use(express.json())
dbConnect(app)

app.get('/tasks',Auth,(req,res)=>{
    getTasks(req.user,res)
})

app.post('/tasks/new',Auth,(req,res)=>{
    addTask(req.user,req.body,res)
})

app.delete('/tasks/:taskId',Auth,(req,res)=>{
    deleteTask(req.user, req.params.taskId,res)
})

app.post('/login', (req,res)=>{
    userLogin(req.body,res)
})

app.post('/signup', (req,res)=>{
    userSignup(req.body, res)
})
