const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
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
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user", "admin","mechanic"],
        default:"user"
    },
    isVerified:{                            
        type:Boolean,
        default:false
    },
    resetToken: {
    type: String,
    default: null
    },
    resetTokenExpiry: {
    type: Date,
    default: null
    },
    location: {                              
    lat: { type: Number },
    lng: { type: Number }
  },
    
   

}, { timestamps: true }) 


// Hash password before saving
userSchema.pre('save', async function() {    
    if(!this.isModified('password') && !this.isNew) 
    return
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema);

module.exports = User;