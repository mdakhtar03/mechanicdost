const express = require("express")
require("dotenv").config();
const connectDB = require("./config/db");
const { connect } = require("mongoose");





const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json);

app.get('/',(req,res)=>{
res.send('Hello World!')
})
connectDB();
app.listen(PORT,()=>{
      console.log(`Your App is live on PORT No. ${PORT}`);
})