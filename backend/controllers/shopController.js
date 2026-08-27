const Shop = require('../models/Shop');


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