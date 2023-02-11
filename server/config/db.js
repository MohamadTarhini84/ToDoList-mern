const mongoose=require('mongoose')

const uri="mongodb://127.0.0.1:27017/testToDoApp"

module.exports=(app)=>{
    mongoose.set('strictQuery', true)
    mongoose.connect(uri,()=>{
        console.log("connected to mongodb")
        app.listen(3001)
    })
}
