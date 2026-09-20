const Shop = require('../models/Shop');
const Mechanic = require('../models/Mechanic');

exports.createShop = async (req,res)=>{
    try{
        const {name, address, location, city, state,
             pincode, phoneNumber, gstNumber, shopLicenseNumber, specializations} = req.body;

             //check if all required fields are present
        if(!name || !address || !location || !location.lat || !location.lng || !city || !state || !pincode || !phoneNumber || !gstNumber || !shopLicenseNumber || !specializations){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }
        const ownerId = req.user.userId;
        const adminShop = await Shop.findOne({ ownerId })
        if(adminShop){
            return res.status(400).json({
                success: false,
                message: "You already have a shop. Only one shop per admin allowed."
            })
        }
        //check if shop with same gstNumber or shopLicenseNumber already exists
        const existingShop = await Shop.findOne({$or:[{gstNumber},{shopLicenseNumber}]});

        if(existingShop){
            return res.status(400).json({
                success:false,
                message: "Shop with same GST number or Shop License number already exists"
            }) 
        }

        
        const newShop = await Shop.create({
            name,
            address,
            location,
            city,
            state,
            pincode,
            phoneNumber,
            gstNumber,
            shopLicenseNumber,
            specializations,
            ownerId
        });

        res.status(201).json({
            success:true,
            message: "Shop created successfully",
            data: newShop
        });

    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while creating shop",
            error: err.message
        })
    }
}

exports.getMyShop = async (req,res)=>{
    try{
        const ownerId = req.user.userId;
        const shop = await Shop.findOne({ownerId});
        if(!shop){
            return res.status(404).json({
                success:false,
                message: "Shop not found"
            })
        }
        res.status(200).json({
            success:true,
            data: shop
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while fetching shop",
            error: err.message
        })
    }
}

exports.updateShop = async (req,res)=>{
    try{
        const ownerId = req.user.userId;
        const shop = await Shop.findOne({ownerId});
        if(!shop){
            return res.status(404).json({
                success:false,
                message: "Shop not found"
            })
        }
        const { ownerId: _, isVerified, rating, gstNumber, ...allowedUpdates } = req.body

        const updatedShop = await Shop.findOneAndUpdate({ownerId}, 
            allowedUpdates, 
            {new:true}, 
            {runValidators:true});

        res.status(200).json({
            success:true,
            message: "Shop updated successfully",
            data: updatedShop
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while updating shop",
            error: err.message
        })
    }
}

exports.getShopMechanics= async (req,res)=>{
    try{
        const ownerId = req.user.userId;
        const shop = await Shop.findOne({ownerId});
        if(!shop){
            return res.status(404).json({
                success:false,
                message: "Shop not found"
            })
        }
        const mechanics = await Mechanic.find({shopId: shop._id});
        res.status(200).json({
            success:true,
            data: mechanics
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while fetching shop mechanics",
            error: err.message
        })
    }
}

exports.verifyMechanic = async (req,res)=>{
    try{
        const ownerId = req.user.userId;
        const shop = await Shop.findOne({ownerId});
        if(!shop){
            return res.status(404).json({
                success:false,
                message: "Shop not found"
            })
        }
        const mechanicId = req.params.mechanicId;
        const mechanic = await Mechanic.findOne({ _id: mechanicId, shopId: shop._id });
        if(!mechanic){
            return res.status(404).json({
                success:false,
                message: "Mechanic not found in your shop"
            })
        }
        mechanic.isVerified = true;
        await mechanic.save();
        res.status(200).json({
            success:true,
            message: "Mechanic verified successfully"
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message: "Error occurred while verifying mechanic",
            error: err.message
        })
    }
}
