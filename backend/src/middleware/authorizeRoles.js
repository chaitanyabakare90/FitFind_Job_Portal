const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (req.user.role === roles) {
            return next();
        }
        return res.status(403).json({
            success: false,
            message: "Access Denied"
        });
    };
};

module.exports = authorizeRoles;