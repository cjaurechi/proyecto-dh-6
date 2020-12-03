function localsMiddleware(req, res, next) {
    if(req.session.usuarioLogueado != undefined) {
        res.locals.user = req.session.usuarioLogueado;
    }
    return next();
}

module.exports = localsMiddleware;