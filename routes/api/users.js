var async = require('async');
var crypto = require('crypto');
const userController = require("../../controllers/usersController");

const router = require("express").Router();
//home page, must be logged in.
router
    .route("/")
    .get(userController.islogged, function (req, res) {
        res.render('index', {
            title: 'Express',
            user: req.user
        });
    });

//login routes
router
    .route("/login")
    .get(function (req, res) {
        res.render('login', {
            user: req.user
        });
    })

    .post(function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) return next(err)
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        })(req, res, next);
    });

// signup routes
router
    .route('/signup')
    .get(function (req, res) {
        res.render('signup', {
            user: req.user
        });
    })
    .post(function (req, res) {
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        user.save(function (err) {
            req.logIn(user, function (err) {
                res.redirect('/');
            });
        });
    });

//logout route
router
    .route('logout')
    .get(function (req, res) {
        req.logout();
        res.redirect('/');
    });

// password reset
router
    .route('/forgot')
    .get(function (req, res) {
        res.render('forgot', {
            user: req.user
        });
    })
    .get(function (req, res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.render('reset', {
                user: req.user
            });
        });
    })

    .post( function (req, res, next) {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                User.findOne({ email: req.body.email }, function (err, user) {
                    if (!user) {
                        req.flash('error', 'No account with that email address exists.');
                        return res.redirect('/forgot');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'SendGrid',
                    auth: {
                        user: '!!! YOUR SENDGRID USERNAME !!!',
                        pass: '!!! YOUR SENDGRID PASSWORD !!!'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'passwordreset@demo.com',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function (err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
    })

    router.route('/reset/:token')
    .post(function (req, res) {
        async.waterfall([
            function (done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                    if (!user) {
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }

                    user.password = req.body.password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function (err) {
                        req.logIn(user, function (err) {
                            done(err, user);
                        });
                    });
                });
            },
            function (user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'SendGrid',
                    auth: {
                        user: '!!! YOUR SENDGRID USERNAME !!!',
                        pass: '!!! YOUR SENDGRID PASSWORD !!!'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'passwordreset@demo.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    req.flash('success', 'Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function (err) {
            res.redirect('/');
        });
    });
module.exports = router;

