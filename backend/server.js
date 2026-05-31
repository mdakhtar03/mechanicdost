const express = require("express")
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');





const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
connectDB();

//routes
app.use('/api/v1/auth', authRoutes);


app.get('/',(req,res)=>{
res.send('MechanicDost backend running!')
})

app.listen(PORT,()=>{
      console.log(`Your App is live on PORT No. ${PORT}`);
})


