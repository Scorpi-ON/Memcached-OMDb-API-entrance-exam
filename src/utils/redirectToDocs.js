function middleware (req, res, next) {
    if (Object.keys(req.query).length > 0) {
        next();
    } else {
        res.set(
            'Warning',
            '299 - "To use the API you should pass at least one parameter. Redirecting to docs."'
        );
        res.redirect(308, '../docs');
    }
}

module.exports = middleware
