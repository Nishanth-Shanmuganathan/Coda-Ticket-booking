const cors = require('cors')
const express = require('express')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')

const {authRouter,authenticate} = require('./src/routes/authentication')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
// console.log('hiii');

app.use('/authentication',authRouter)

app.post('/ticketbooking',authenticate,(req,res)=>{
    console.log(req.body);
    
    res.send({
        msg:"hii"
    })
})
mongoose.connect(process.env.DB_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(res=>{
    app.listen(process.env.PORT)
    console.log('Server listening at port : '+ process.env.PORT);
})
.catch(err=>{
    console.log('Connection to database failed...');
    
})
