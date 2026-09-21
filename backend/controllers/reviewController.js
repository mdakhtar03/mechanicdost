const Review = require('../models/Review');
const Mechanic = require('../models/Mechanic');
const Request = require('../models/Request');

exports.submitReview = async (req, res) => {
    try {
        const { mechanicId,requestId, rating, comment } = req.body;
        const userId = req.user.userId;

        // Check if the mechanic exists
        const mechanic = await Mechanic.findById(mechanicId);
        if (!mechanic) {
            return res.status(404).json({
                success: false,
                message: "Mechanic not found"
            });
        }
        

        // Check if the user has requested services from this mechanic
        const request = await Request.findOne({ _id: requestId, userId, mechanicId });
        if (!request) {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            });
        }

        //Check if the request is completed or resolved before allowing review
        if(request.status !== 'resolved'){
            return res.status(400).json({
                success: false,
                message: "You can only review a mechanic after the request is resolved"
            });
        }
        //check already reviewed
        const existingReview = await Review.findOne({ mechanicId, userId, requestId });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already submitted a review for this request"
            });
        }
        // Create the review
        const review = new Review({
            mechanicId,
            userId,
            requestId,
            shopId: request.shopId,
            rating,
            comment
        });

        await review.save();
        
        const reviews = await Review.find({ mechanicId });
        const avgRating = reviews.reduce((sum,r)=> sum + r.rating,0) / reviews.length;
        await Mechanic.findByIdAndUpdate(mechanicId, { averageRating: avgRating });
        res.status(201).json({
            success: true,
            reviewLength: reviews.length,
            averageRating: avgRating,
            message: "Review submitted successfully"
        });
    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.getMechanicReviews = async (req, res) => {
    try{
        // get mechanicId from params
        const mechanicId = req.params.mechanicId;
        // Check if the mechanic exists
        const mechanic = await Mechanic.findById(mechanicId);
        if (!mechanic) {
            return res.status(404).json({
                success: false,
                message: "Mechanic not found"
            });
        }
        const reviews = await Review.find({mechanicId})
        .populate({path: 'userId',select:'name email'})
        .populate({path: 'shopId',select:'name city'})
        .sort({createdAt:-1});
        res.status(200).json({
            success: true,
            reviews
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.getMyReviews = async (req,res)=>{
    try{
        const userId = req.user.userId;
        const reviews = await Review.find({userId})
        .populate({path: 'mechanicId',select:'name averageRating'})
        .populate({path: 'shopId',select:'name city'})
        .sort({createdAt:-1});
        res.status(200).json({
            success:true,
            reviews
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Internal server error"
        });
    }
};
