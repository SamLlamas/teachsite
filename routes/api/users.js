const async = require('async');
const crypto = require('crypto');
const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const db = require("../../models");
const sgMail = require('@sendgrid/mail');
var bcrypt = require('bcrypt-nodejs');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



//login routes
router.get("/", usersController.getUser);
router.post("/", usersController.checkLogin);

// signup routes
router
    .route('/signup')
    .get(function (req, res) {
        res.render('signup', {
            user: req.user
        });
    })
    .post(usersController.signUp);

//logout route
router
    .route('logout')
    .get(function (req, res) {
        req.logout();
        res.redirect('/');
    });

// password reset
router.get("/forgot", function (req, res) {
    res.render('forgot', {
        user: req.user
    });
});

router.post("/forgot", function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            const User = db.User
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    console.log("not working")
                    return res.json(false);
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            const msg = {
                to: user.email,
                from: 'resetPass@pantherden.com',
                subject: 'Password Reset',
                text: 'Password Reset Link: http://' + req.headers.host + '/forgot/' + token + '\n\n' 
            };
            sgMail.send(msg);
            return res.json(true);
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
})

router.get('/forgot/:id', function (req, res) {
        
        const User = db.User
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect(false);
            }
        });
    })
router.post('/forgot/:id', function (req, res) {
    async.waterfall([
        function (done) {
            db.User.findOne({ resetPasswordToken: req.params.id, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    console.log("not working")
                    return res.json(false);
                }
                

                
                user.password = req.body.password

                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;


                user.save(function (err) {
                    done(err, user);
                });
        
            });
        },
        function (user, done) {
            
            const msg = {
                to: user.email,
                from: 'resetPass@pantherden.com',
                subject: 'Password Reset',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            sgMail.send(msg);
            return res.json(true);
        }
    ], function (err) {
        if (err) console.log("rip");
        res.redirect(false);
    });
});

module.exports = router;


