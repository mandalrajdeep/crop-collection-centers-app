function accessGroup(roles) {
    return function(req, res, next) {
        var index = roles.indexOf(req.user.local.role);
        if (req.user && index >= 0)
            next();
        else
            return res.status(403).send('Unauthorized Access');
    };
};

module.exports.accessGroup = accessGroup;