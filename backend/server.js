const express = require("express")
require("dotenv").config();
const connectDB = require("./config/db");






const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.get('/',(req,res)=>{
res.send('Hello World!')
})
connectDB();
app.listen(PORT,()=>{
      console.log(`Your App is live on PORT No. ${PORT}`);
})

const sendOTP = require('./utils/sendOTP');

app.get('/test-email', async (req,res)=>{
    try{
        await sendOTP("mdakhtarlog@gmail.com", "123456");
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});