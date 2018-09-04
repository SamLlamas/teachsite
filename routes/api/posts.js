const router = require("express").Router();
const postsController = require("../../controllers/postsController");
var passport = require('passport');
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
    postsController.findAll(req, res)
  }
  else {
    res.redirect('/login');
  }
});
router.post("/", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body)
    postsController.create(req, res)
    
  }
  else {
    res.redirect("/login");
  }
});

// Matches with "/api/books/:id"
router.get("/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    postsController.findById(req, res)
  }
  else {
    res.redirect("/login");
  }
})
router.put("/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) { postsController.update(req, res) }
})
router.delete("/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
  console.log()
  var token = getToken(req.headers);
  if (token) { 
    postsController.remove(req, res)
  }
});



module.exports = router;
