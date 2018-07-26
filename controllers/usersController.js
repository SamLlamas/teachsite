const db = require("../models");
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

// Defining methods for the booksController
module.exports = {
    getUser: function (req, res) {
    },
    checkLogin: function (req, res) {
        db.User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {

                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign(user.toJSON(), settings.secret);
                        // return the information including token as JSON
                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
    },

    signUp: function (req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({ success: false, msg: 'Please pass username and password.' });
        } else {
            var newUser = new db.User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            // save the user
            newUser.save(function (err) {
                if (err) {
                    return res.json({ success: false, msg: 'Username already exists.' });
                }
                res.json({ success: true, msg: 'Successful created new user.' });
            });

        }
    },

    isLogged: function () {
        passport.authenticate('jwt', { session: false }, function (req, res) {
            getToken = function (headers) {
                if (headers && headers.authorization) {
                    var parted = headers.authorization.split(' ');
                    if (parted.length === 2) {
                        return parted[1];
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
              }
            console.log(2)
            var token = getToken(req.headers);
            if (token) {
                return true
            } else {
                return res.status(403).send({ success: false, msg: 'Unauthorized.' });
            }
        })
    }
};



