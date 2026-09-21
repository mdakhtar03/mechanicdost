const Request = require('../models/Request');
const Mechanic = require('../models/Mechanic');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const OTP = require('../models/OTP');


exports.getNearbyRequests = async (req,res)=>{

    try{
        const userId = req.user.userId;
        const mechanic = await Mechanic.findOne({userId});
        if(!mechanic){
            return res.status(404).json({
                success:false,
                message: "Mechanic not found"
            })
        }
        //check if machanic is verified
        if(!mechanic.isVerified){
            return res.status(403).json({
                success:false,
                message: "Your account is not verified yet. Please wait for admin approval."
            })
        }

        //check if mechanic is available
        if(!mechanic.isAvailable){
            return res.status(403).json({
                success:false,
                message: "You are currently marked as unavailable. Please update your status to available to see nearby requests."
            })
        }
        // get all pending requests
        const pendingRequests = await Request.find({status:'pending'});

        //! Filter will be add after 2 Week
        res.status(200).json({
            success:true,
            count: pendingRequests.length,
            requests: pendingRequests
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while fetching nearby requests",
            error: err.message
        })
    }
}


exports.acceptRequest = async (req,res) =>{
    try{
            const requestId = req.params.id;
            const request = await Request.findById(requestId);
            if(!request){
                return res.status(404).json({
                    success:false,
                    message: "Request not found"
                })
            }
            const mechanic = await Mechanic.findOne({userId: req.user.userId});
            if(!mechanic){
                return res.status(404).json({
                    success:false,
                    message: "Mechanic not found"
                })
            }
            if(!mechanic.isVerified){
                return res.status(403).json({
                    success:false,
                    message: "Your account is not verified yet. Please wait for admin approval."
                })
            }
            if(!mechanic.isAvailable){
                return res.status(403).json({
                    success:false,
                    message: "You are currently marked as unavailable. Please update your status to available to accept requests."
                })
            }
            if(request.status !== 'pending'){
                return res.status(400).json({
                    success:false,
                    message: "Only pending requests can be accepted"
                })
            }
            //update request with mechanicId and change status to accepted
            request.mechanicId = mechanic._id;
            request.status = 'accepted';
            request.shopId = mechanic.shopId;
            await request.save();

            mechanic.isAvailable = false;
            await mechanic.save();
            res.status(200).json({
                success:true,
                message: "Request accepted successfully",
                request
            })
        }
        catch(err){
            res.status(500).json({
                success:false,
                message: "Error occurred while accepting request",
                error: err.message
            })
        }
    }

    exports.requestCompletionOTP = async (req,res) =>{
        try{
            const requestId = req.params.id;
            const request = await Request.findById(requestId);
            if(!request){
                return res.status(404).json({
                    success:false,
                    message: "Request not found"
                })
            }
            const mechanic = await Mechanic.findOne({userId: req.user.userId});
            if(!mechanic){
                return res.status(404).json({
                    success:false,
                    message: "Mechanic not found"
                })
            }
            if(request.mechanicId.toString() !== mechanic._id.toString()){
                return res.status(403).json({
                    success:false,
                    message: "You are not assigned to this request"
                })
            }
            if(request.status !== 'accepted'){
                return res.status(400).json({
                    success:false,
                    message: "Only accepted requests can request completion OTP"
                })
            }
            //generate 6 digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpEntry = await OTP.create({
                userId: request.userId,
                otp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000) // OTP valid for 10 minutes
            });
            //send OTP to user email
            const user = await User.findById(request.userId);
            await sendEmail({
                email: user.email,
                type: "jobComplete",
                otp,
                name: user.name
            });
    
            res.status(200).json({
                success:true,
                message: "Completion OTP generated successfully",
                
            })
        }
        catch(err){
            res.status(500).json({
                success:false,
                message: "Error occurred while generating completion OTP",
                error: err.message
            })
        }
    }

    exports.completeRequest = async (req,res) =>{

        try{
            const requestId = req.params.id;
            const {otp} = req.body;
            const mechanic = await Mechanic.findOne({userId: req.user.userId});
            if(!mechanic){
                return res.status(404).json({
                    success:false,
                    message: "Mechanic not found"
                })
            }
            // find mechanic who accepted request
            const request = await Request.findOne({_id: requestId, mechanicId: mechanic._id});
            if(!request){
                return res.status(404).json({
                    success:false,
                    message: "Request not found or you are not assigned to this request"
                })
            }
            if(request.status !== 'accepted'){
                return res.status(400).json({
                    success:false,
                    message: "Only accepted requests can be marked as completed"
                })
            }

            //verify OTP
            const otpEntry = await OTP.findOne({userId: request.userId, otp});
            if(!otpEntry){
                return res.status(400).json({
                    success:false,
                    message: "Invalid OTP"
                })
            }
            if(otpEntry.expiresAt < new Date()){
                return res.status(400).json({
                    success:false,
                    message: "OTP has expired"
                })
            }
            
            
            //update request status to resolved and make mechanic available again
            request.status = 'resolved';
            //delete OTP entry after successful verification
            await OTP.deleteOne({_id: otpEntry._id});
            await request.save();
            mechanic.isAvailable = true;
            await mechanic.save();
            res.status(200).json({
                success:true,
                message: "Request marked as completed successfully",
                request
            })
        }
        catch(err){
            res.status(500).json({
                success:false,
                message: "Error occurred while completing request",
                error: err.message
            })
        }
    }



