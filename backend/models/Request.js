const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    mechanicId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Mechanic',
    },
    vehicleType:{
        type:String,
        enum:['car','bike','truck'],
        required:true,
    },
    issueDescription:{
        type:String,
        required:true,
    },

    status:{
        type:String,
        enum:['pending','accepted','cancelled','resolved'],
        default:'pending',  
    },

    location:{
        lat:{
            type:Number,
            required:true,},
        lng:{
            type:Number,
            required:true,
        },
    }
        
        
         },{timestamps:true});

const Request = mongoose.model('Request',requestSchema);

module.exports = Request;