// import dotenv for secret variables 
const dotenv = require('dotenv');
dotenv.config();

// import express app
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

// get db from mongoose
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// connecting SASS
const sassMiddleware = require('node-sass-middleware');

// setup connect-flash
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// use sass middleware
app.use(sassMiddleware({
    src: './public/sass',
    dest: './public/css',
    debug: true,
    outputStyle: 'compressed',
    // where should my server look out for css file
    prefix: '/css'
}));

// reading through the post request
app.use(bodyParser.urlencoded({ extended: false }));

// setting up the cookie parser
app.use(cookieParser());

app.use(express.static('./public'));

// directory used to upload files or images on this path
app.use('/uploads', express.static(__dirname + '/public/uploads')) 

// layouts section
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', './layouts/main')
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Set the template engine ejs
app.set('view engine','ejs');

// set the view directory
app.set('views', path.join(__dirname,'views'));

// Create a session
app.use(session ({
    name: 'social_app',
    secret: 'dgsge3twsdvgsbhhbsdfeesfndsvd4xnfjdsde3',
    // the user has not logged in, identity is not established, in that case do we need to add extra data to store in session cookies so we set it to false(if no)
    saveUninitialized: false,
    // if already a user_id is stored in the cookie we dont need to save again and again
    resave: false,
    // expire time for cookie
    cookie: {
        maxAge: (1000* 60* 100)
    },
    // used to store the session in db even
    store: MongoStore.create(
        {
            mongoUrl: process.env.MONGO_URL,
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )

}));

// to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

// to set user as authenticated user
app.use(passport.setAuthenticatedUser);

// to flash the messages on frontend for error and success message
app.use(flash());
app.use(customMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));

//Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('App is running on ' + PORT);
});