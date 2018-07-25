const db = require("../models");
var passport = require('passport');

module.exports = {
    islogged: function(req, res, next){
        if(req.isAuthenticated()){
          return next()
        }
        return res.redirect("/login")
      }
      

};
