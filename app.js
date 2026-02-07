import express from 'express';

const app = express();

app.get("/", (req, res)=> {
   res.send("Welcom to subscription tracker API!")

})

app.listen(3000, ()=>{
    console.log("Subscription Tracker API is running on: http://localhost:3000")
})