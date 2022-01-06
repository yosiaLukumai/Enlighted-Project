const checkLoggedIn = (req, res, next) => 
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();

}

const checkLoggedOut = (req, res, next) =>
{
    if(req.isAuthenticated())
    {
        return res.redirect('/dash')
    }
    next();

}

const postLogOut = (req, res) => 
{
    req.session.destroy(function(err){
        return res.redirect('/login')
    })
}

module.exports =
{
    checkLoggedOut: checkLoggedOut,
    checkLoggedIn: checkLoggedIn,
    postLogOut: postLogOut
}