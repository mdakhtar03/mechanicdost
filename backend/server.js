const express = require("express")
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
const shopRoutes = require('./routes/shopRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const socketHandler = require('./socket/socketHandler');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true,
}))

app.use(express.json());
connectDB();

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/mechanics', mechanicRoutes);
app.use('/api/v1/shop',shopRoutes);
app.use('/api/v1/reviews',reviewRoutes);
app.use('/api/v1/admin',adminRoutes);
app.get('/',(req,res)=>{
res.send('MechanicDost backend running!')
})



//Create HTTP server 
const server  = http.createServer(app)


//Create socket.io server
const io = new Server(server,{
     cors:{
      origin: "*",
      methods: ["GET","POST"]
     } 
})
socketHandler(io);

server.listen(PORT,()=>{
      console.log(`Your App is live on PORT No. ${PORT}`);
})