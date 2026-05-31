const jwt = require('jsonwebtoken')
exports.authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success:false,
            message: "Unauthorized access"
        })
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: "Invalid or expired token"
        })
    }
}

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