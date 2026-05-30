const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
        userId:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',required:true 
        },
        specialization: {
        type: String,
        enum: ['car', "bike", "truck", "all"],
        required: true,
        },
        isVerified:{ 
            type: Boolean,
            default: false
        },

        isAvailable:{
            type: Boolean,
            default: true
        },
        averageRating:{
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        activeLocation:
         { 
            lat: { type: Number },
            lng: { type: Number }
          },

}, { timestamps: true });

const Mechanic = mongoose.model('Mechanic', mechanicSchema);
module.exports = Mechanic;