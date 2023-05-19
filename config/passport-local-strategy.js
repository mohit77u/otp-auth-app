const passport = require('passport');
const bcrypt = require("bcrypt");
const User = require('../models/user');

// telling passport to use local strategy
const LocalStrategy = require('passport-local').Strategy;

// create authentication function (we need passport to use this local strategy)
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},

async function(req, email, password, done){
    // find a user and establish the identity
    const user = await User.findOne({ email });
    if(!user){
        req.flash('error', 'User does not exists.');
        return done(null, false);
    }
    else
    {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch)
        {
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }
        else 
        {
            return done(null, user);
        }

    }
}

));

//  Serializing the user to declare which key is to be kept in the cookies(which property to be sent to the cookie)
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// Deserializing the user from the key in the cookies(picking out id from the session cookie)
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done('err');
        }

        return done(null, user);    
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in then pass on the requested page
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in redirect to signin
    return res.redirect('/signin');
}

// check if the user is authenticated
passport.check2faAuth = function(req, res, next){
    // if the user is signed in or not
    if(!req.isAuthenticated()) {
        return res.redirect('/signin');
    } 
    // check auth login and having otp or not
    else if(req.isAuthenticated() && req.user.login_otp){
        return res.redirect('/verify-otp');
    } 
    // check auth and otp not available then pass on the requested page
    else if(req.isAuthenticated() && !req.user.login_otp){
        return next();
    }
}

// to access the authenticated user
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // whenever a user is signed in that user's info is available in req.user
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;