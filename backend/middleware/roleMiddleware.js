exports.authMiddlewareShopOwner = (req,res,next)=>{
    if(req.user.role !== 'shopOwner'){
        return res.status(403).json({
            success:false,
            message: "Forbidden: Shop Owners only"
        })
     }
        next();
}

exports.authMiddlewareMechanic = (req,res,next)=>{
    if(req.user.role !== 'mechanic'){
        return res.status(403).json({
            success:false,
            message: "Forbidden: Mechanics only"
        })
     
    }
        next();

}

exports.authMiddlewareUser = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(403).json({
            success:false,
            message: "Forbidden: Users only"
        })
    }
    next();
}

exports.authMiddlewarePlatformAdmin = (req, res, next) => {
    if(req.user.role !== 'platformAdmin'){
        return res.status(403).json({
            success: false,
            message: "Forbidden: Platform Admin only"
        })
    }
    next()
}