const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization; // provide token in format Bearer <token>
    if(!authHeader){
        return res.status(401).json({
            message: "Access Denied. No token provided."
        });
    }
    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //stores payload in req
        req.user = decoded;

        next();
    }catch(err){
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }

}

module.exports = verifyToken;