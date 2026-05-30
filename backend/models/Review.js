const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    requestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required:true                               
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',required:true},
    mechanicId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mechanic',required:true},
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true,},
    comment:{
        type:String,
        trim:true,
    }
},{timestamps:true});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;