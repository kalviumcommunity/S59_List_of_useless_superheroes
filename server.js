const Express=require("express");
const app=Express();

const port=5000;

app.get("/",(req,res)=>{
    res.send("<h1>h</h1>")
});

app.listen(port,()=>{
    console.log(`app is runnig ${port}`)
})

module.exports = {
    app
}