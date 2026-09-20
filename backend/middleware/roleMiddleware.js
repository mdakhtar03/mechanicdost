exports.authMiddlewareAdmin = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({
            success:false,
            message: "Forbidden: Admins only"
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