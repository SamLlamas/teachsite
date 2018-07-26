const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const usersController = require("../../controllers/usersController");
var passport = require('passport');
var settings = require('../../config/settings');
require('../../config/passport')(passport);


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
};

// Matches with "/api/books"
router.get("/", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    booksController.findAll(req, res)
  }
  else {
    res.redirect('/login');
  }
});
router.post("/", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    booksController.create(req, res)
  }
  else {
    console.log("test")
    res.redirect("/login");
  }
});

// Matches with "/api/books/:id"
router.get("/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    booksController.findById(req, res)
  }
  else {
    console.log("test")
    res.redirect("/login");
  }
})
router.put("/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) { booksController.update(req, res) }
})
router.delete("/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) { 
    booksController.remove(req, res)
  }
});



module.exports = router;
