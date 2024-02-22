const express=require("express");
const app=express();

const port=5000;

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to the curated collection of superheroes who, in certain timelines or specific events, demonstrated a level of impracticality or perceived uselessness. The superheroes included in this list may have faced challenges where their contributions were notably limited, showcasing the diversity of their experiences within the chosen universe—be it Marvel or DC.</h1>")
});

app.listen(port,()=>{
    console.log(`app is runnig ${port}`)
})

module.exports = {
    app
}