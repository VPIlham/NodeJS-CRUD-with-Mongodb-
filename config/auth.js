module.exports = {
  checkAuth : function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/auth/login');
  },
  forwardAuth : function(req, res, next){
    if(!req.isAuthenticated()){
      return next();
    }
    res.redirect('/dashboard');
  }
}