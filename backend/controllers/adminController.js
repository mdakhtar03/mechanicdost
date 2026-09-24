//This is the platform for admin to manage the platform. 
// Admin can view all the mechanics, shops, and requests. 
// Admin can also delete any mechanic, shop, or request. 
// Admin can also view the reviews of the mechanics and shops. 
// Admin can also delete any review. 
// Admin can also view the details of any mechanic, shop, or request.

const Mechanic = require('../models/Mechanic');
const Shop = require('../models/Shop');
const Request = require('../models/Request');
const Review = require('../models/Review');
const User = require('../models/User');

//Get All Shop 
exports.getAllShops = async (req, res) =>{
    try{
        const shops = await Shop.find()
        .populate('ownerId', 'name email')

        const ShopWithMechanicsCount =  await Promise.all(shops.map(async (shop)=>{
            const mechanicsCount = await Mechanic.countDocuments({shopId: shop._id});
            return {
                ...shop.toObject(),
                mechanicsCount
            }
        }))
        const totalMechanics = await Mechanic.countDocuments()
        res.status(200).json({
            success: true,
            totalShops: shops.length,totalMechanics,
            shops: ShopWithMechanicsCount
        })


    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while fetching shops",
            error: err.message
        })
    }
}

exports.verifyShop = async (req,res)=>{
    try{
        const shopId = req.params.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return res.status(404).json({
                success:false,
                message: "Shop not found"
            })
        }
        if(shop.isVerified){
            return res.status(400).json({
                success:false,
                message: "Shop is already verified"
            })
        }
        shop.isVerified = true;
        await shop.save();
        res.status(200).json({
            success:true,
            message: "Shop verified successfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while verifying shop",
            error: err.message
        })
    }
}

exports.getAllpersons = async (req,res)=>{
    try{
        const users = await User.find().select('-password');
        res.status(200).json({
            success:true,
            count:users.length,
            users
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while fetching users",
            error: err.message
        })
    }
}

exports.blockUser = async (req,res)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message: "User not found"
            })
        }
        if(user.isBlocked === true){
            return res.status(400).json({
                success:false,
                message: "User is already blocked"
            })
        }      
        user.isBlocked = true;
        await user.save();
        res.status(200).json({
            success:true,
            message: "User blocked successfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while blocking user",
            error: err.message
        })
    }
}
//Unblock User
exports.unblockUser = async (req,res)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message: "User not found"
            })
        }
        if(user.isBlocked === false){
            return res.status(400).json({
                success:false,
                message: "User is not blocked"
            })
        }      
        user.isBlocked = false;
        await user.save();
        res.status(200).json({
            success:true,
            message: "User unblocked successfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while unblocking user",
            error: err.message
        })
    }
}
// Total Users, Total Shops, Total Mechanics, Total Requests, Total Reviews

exports.getDashboardStats = async (req,res)=>{
    try{
        const [totalUsers, totalShops, totalMechanics,
             totalRequests,totalPendingRequests,totalResolvedRequests, totalReviews] = await Promise.all([
            User.countDocuments(),
            Shop.countDocuments(),
            Mechanic.countDocuments(),
            Request.countDocuments(),
            Request.countDocuments({status:'pending'}),
            Request.countDocuments({status:'resolved'}),
            Review.countDocuments()
        ]);
        res.status(200).json({
            success:true,
            stats:{
                totalUsers,
                totalShops,
                totalMechanics,
                totalRequests,
                totalPendingRequests,
                totalResolvedRequests,
                totalReviews
            }
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while fetching dashboard stats",
            error: err.message
        })
    }
}