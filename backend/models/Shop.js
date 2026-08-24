const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    location:{
        lat:{
            type:Number,
            required:true,},
        lng:{
            type:Number,
            required:true,
            },
    },
    address:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    

    phoneNumber:{
        type:String, 
        required:true
    },

    gstNumber:{
        type:String,
        required:true
    },
    shopLicenseNumber:{
        type:String,
        required:true,
    },
    specializations:{
        type:[String],
        enum:['car','bike','truck','all'],
        required:true
    },
    
    isVerified:{
        type:Boolean,
        default:false
    },

    isActive:{
        type:Boolean,
        default:true
    },

    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },

}, {timestamps:true});

const Shop = mongoose.model('Shop',shopSchema);
module.exports = Shop;