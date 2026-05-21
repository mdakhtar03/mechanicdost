const mongoose = require("mongoose");

const userSchema = new Scheme.mongoose({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:[]
    },
    location: {                              
    lat: { type: Number },
    lng: { type: Number }
  },
    
   

}, { timestamps: true }) 

const User = mongoose.model('User', userSchema);

module.exports = User;