const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");

const mongoDB=require("./db");
mongoDB()
app.get('/', (req, res) => {
  res.send("hello world")
})

//middleware
app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Control-Type, Accept"
);
next();
});
// Socket.io

app.use(cors());
app.use(express.json())
app.get("/api",(req,res)=>{
res.status(200).json("Got it");
})
app.use("/api",require("./routes/createuserroutes"));
app.use("/api",require("./routes/fetchCategories"));
app.use("/api",require("./routes/transportationroutes"));
app.use("/api",require("./routes/restaurantroutes"));
app.use("/api",require("./routes/accomodationroutes"));
app.use("/api",require("./routes/Shoppingroutes"));
app.use("/api",require("./routes/Touristroutes"));
app.use("/api",require("./routes/vendorroutes"));
app.use("/api",require("./routes/bookingdates_transport"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})