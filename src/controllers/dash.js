const dashboard = (req, res, next) =>
 {
    res.render('dashboard',
    {
        user: req.user
    })
 }


module.exports = 
{
    dashboard: dashboard,
    
}