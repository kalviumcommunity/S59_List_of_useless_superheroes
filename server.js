const express = require("express")
const app = express()

const port = 3900

app.get("/ping",(req,res)=>{
    res.send("pong")
})

if(require.main === module){
    app.listen(port, ()=>{
        console.log("the app runs on port", port)
    })
}

module.exports = {
    app
}