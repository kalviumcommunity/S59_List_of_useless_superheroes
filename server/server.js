const express=require("express");
const cors = require("cors")
const app=express();

const routes = require('./src/router/router')
const authRoute = require('./src/router/AuthRouter')
const contentRoute = require('./src/router/ContentRouter')

const port= 5000;
app.use(cors())
app.use(express.json())

app.use('/auth', authRoute);
app.use('/content', contentRoute);
// app.use('/api', routes); 


app.listen(port,()=>{
    console.log(`app is runnig ${port}`)
})
