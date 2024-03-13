const express=require("express");
const cors = require("cors")
const app=express();

const routes = require('./src/router/router')

const port= process.env.PORT || 8080;
app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.listen(port,()=>{
    console.log(`app is runnig ${port}`)
})
