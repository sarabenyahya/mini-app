// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    
    return res.status(401).json({ message: 'Non autorisé. Veuillez vous connecter.' });
};

// Admin authorization middleware
const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        return next();
    }
    
    return res.status(403).json({ message: 'Accès refusé. Privilèges administrateur requis.' });
};

module.exports = {
    isAuthenticated,
    isAdmin
};