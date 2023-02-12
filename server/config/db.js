const mongoose=require('mongoose')
require('dotenv').config()

module.exports=(app)=>{
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.DB_URI,()=>{
        console.log("connected to mongodb on port "+process.env.DEV_PORT)
        app.listen(process.env.DEV_PORT)
    })
}
