var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var errorController =require('../../controllers/errorController');
var bCrypt = require('bcrypt-nodejs');
var models = require('../../models/index');
var User =models.user;
var config =require('./config');
var dbErrors =new errorController();

module.exports = function(passport) {
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    
    User.findOne({where:{id:jwt_payload.id}}).then(user => {  
        if (user){
            done(null, user);
        }else{
            done(null, false,{message:"Not authenticated"});
        }
        
    }).catch(function(err){
        res.json(dbErrors.getOrmError(err));
    });

}))
};