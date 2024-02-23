const express=require("express");
const app=express();

const port=5000;

app.get("/",(req,res)=>{
    res.send("<h1>Request Recieved!</h1>")
});

app.listen(port,()=>{
    console.log(`app is runnig ${port}`)
})

module.exports = {
    app
}