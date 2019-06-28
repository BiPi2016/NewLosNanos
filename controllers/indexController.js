const mongoose = require('mongoose');
const Product = require('../models/product');

const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Get Landing Page
exports.getHome = (req, res, next) => {
    console.log('Homepage');
    console.log('session is ' + req.session.id);
    res.render('index', { 
        title: 'Express', 
        topMenu: topCategory,
        footerMenu: footerMenu,
        carousellImgs: resources.carousellImgUrls,
        featuredProducts: resources.featuredProducts
     });
};


// Get Login
exports.getLogIn = (req, res, next) => {
    console.log('User Login page');
    res.render('login', {
        title: 'User Login Page',
        topMenu: topCategory,
        footerMenu: footerMenu,
        adminUser: false
    });
};

// Post login
exports.postLogIn = (req, res, next) => {
    console.log('Posting the user-log-in request');
    res.send('Post log in page');
};

// Get Sign up
exports.getSignUp = (req, res, next) => {
    console.log('Getting sign-up form');
    res.render('signup', {
        title: 'Register with Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Post Sign up
exports.postSignUp = [
    // Validate
    body('userEmail', 'Username should be a valid email').isEmail(),    
    body('confirmEmail', 'Confirmation email should be a valid email').isEmail(),
    body('password', 'Password must be minimum 8 characters long').isLength({min: 8}).trim(),    
    body('repeatPass', 'Password(repeated) must be minimum 8 characters long').isLength({min: 8}).trim(),

    // Sanitize
    sanitizeBody('userEmail').escape(),
    sanitizeBody('confirmMail').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('repeatPass').escape(),

    // Handle request
    (req, res, next) => {
        console.log('Posting sign-up data');

        const errors = validationResult(req);

        // Check if emails and passwords match
        const email = req.body.userEmail;
        const confEmail = req.body.confirmEmail;
        const pass = req.body.password;
        const repPass = req.body.repeatPass;

        
        // Errors in input
        if(!errors.isEmpty()) {
            console.log(JSON.stringify(errors.array()));
            return res.render('signup', {
                title: 'Errors in input',
                topMenu: topCategory,
                footerMenu: footerMenu,
                errors: errors.array(),
                userEmail: email,
                confirmEmail: confEmail,
                password: pass,
                repeatPass: repPass
            });
        }

        const missMatchErrors = [];
        const passMatch = function() {
            console.log(pass, repPass);
            if(pass !== repPass) missMatchErrors.push( new Error( { passNotMatched: true}));
            return (pass === repPass);
        }

        const emailsMatch = function() {
            console.log(email, confEmail);
            if(email !== confEmail) missMatchErrors.push( new Error( { emailNotMatched: true}));
            return(email === confEmail); 
        }


        // Emails and password unmatch
        if(!passMatch() || !emailsMatch()) {
            return res.render('signup', {
                title: 'Emails/Passwords do not match',
                topMenu: topCategory,
                footerMenu: footerMenu,
                userEmail: email,
                confirmEmail: confEmail,
                password: pass,
                repeatPass: repPass,
                doesEmailsMatch: emailsMatch,
                doesPassMatch: passMatch,
                missMatchErrors: missMatchErrors
            });
        }






    }
];


// Get Category
exports.getProducts = (req, res, next) => {
    // Check if there is a query

    // Paginate before displaying

    // If no query is conducted display products

    Product.find({})
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('categories', {
            title: 'LosNanos Products',
            topMenu: topCategory,
            footerMenu: footerMenu,
            productList: results
        });
    });    
};


// Get Product Details
exports.getProductDetails = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    Product.findOne({_id: id})
    .exec( (err, desiredProd) => {
        if(err) next(err);

        // Could not find the product
        if(!desiredProd) {
            return res.render('productDetails', {
                title: 'Errors 404',
                topMenu: topCategory,
                footerMenu: footerMenu,
                errors: [new Error('Could not find the product')]
            });
        }

        res.render('productDetails', {
            title: desiredProd.name,
            topMenu: topCategory,
            footerMenu: footerMenu,
            product: desiredProd
        });
    });
}

// Get Contact Us
exports.getContactUs = (req, res, next) => {
    res.render('contactus', {
        title: 'Contact Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};
