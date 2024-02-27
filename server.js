const express=require("express");
const app=express();
const {connectToDB, isConnected} = require('./db')
const port=5000;

connectToDB()

app.get("/",(req,res)=>{
    if(isConnected()){
        res.send("<h1>DATABASE CONNECTION ESTABLISHED 🟢🟢🟢🟢</h1>")
    }else{
        res.send("<h1>CONNECTION FAILED 🔴❗️❗️❗️❗️❗️</h1>")
    }
});

app.listen(port,()=>{
    console.log(`app is runnig ${port}`)
})

module.exports = {
    app
}