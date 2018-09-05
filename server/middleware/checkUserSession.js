module.exports = function(req, next) {
    if (!req.session.user) req.session.user = {session_id: '', user_id: '', username: ''}
    next()
}