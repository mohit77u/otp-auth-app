module.exports.setFlash = function(req, res, next){
    // fetches everything from the request flash and puts into the locals
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    // paases to the next middleware
    next();
}