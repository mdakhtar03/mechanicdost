const Request = require('../models/Request');
const User = require('../models/User');
const Mechanic = require('../models/Mechanic');

//create Request

exports.createRequest = async (req,res)=>{
    try{
        const {vehicleType, issueDescription, location} = req.body;
        //check if all required fields are present
        if( !vehicleType || !issueDescription || !location || !location.lat || !location.lng){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }
        const userId = req.user.userId; // Get user ID from authenticated request
     
       
        //check if user has pending request
        const pendingRequest = await Request.findOne({userId, status:'pending'});
        if(pendingRequest){
            return res.status(400).json({
                success:false,
                message: "You already have a pending request. Please wait for it to be resolved before creating a new one."
            })
        }
        //create new request

        const newRequest = await Request.create({
            userId,
            vehicleType,
            issueDescription,
            location
        })
        res.status(201).json({
            success:true,
            message: "Request created successfully",
            request: newRequest
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while creating request",
            error: err.message
        })
    }

}

exports.getUserRequests = async (req,res)=>{
    try{
        const userId = req.user.userId;
        const requests = await Request.find({userId}).sort({createdAt:-1});
        return res.status(200).json({
            success:true,
            count: requests.length,
            requests
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message: "Error occurred while fetching requests",
            error: err.message
        })
    }

}

//cancel request
exports.cancelRequest = async (req,res)=>{

    try{
        const userId = req.user.userId;
        const requestId = req.params.id;

        const request = await Request.findOne({_id:requestId, userId});
        if(!request){
            return res.status(404).json({
                success:false,
                message: "Request not found"
            })
        }

        if(request.status !==  'pending'){
            return res.status(400).json({
                success:false,
                message: "Only pending requests can be cancelled"
            })
        }

        //update request status to cancelled 
        
        await Request.findByIdAndUpdate(requestId, {status:'cancelled'}, {new:true});
        res.status(200).json({
            success:true,
            message: "Request cancelled successfully",
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while cancelling request",
            error: err.message
        })
    }
}