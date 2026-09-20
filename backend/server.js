const express = require("express")
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
const shopRoutes = require('./routes/shopRoutes');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
connectDB();

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/mechanics', mechanicRoutes);
app.use('/api/v1/shop',shopRoutes);
app.get('/',(req,res)=>{
res.send('MechanicDost backend running!')
})

app.listen(PORT,()=>{
      console.log(`Your App is live on PORT No. ${PORT}`);
})


