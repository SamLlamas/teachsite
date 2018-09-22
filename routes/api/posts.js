const router = require("express").Router();
const postsController = require("../../controllers/postsController");
const imgCommands = require("./images")
var passport = require('passport');
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');

let gfs;
var conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost:27017/teachSite", { useNewUrlParser: true });
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("Photos")
  // all set!
})

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI || "mongodb://localhost:27017/teachSite",
  file: function(req, file) {
    
    return {
        metadata: req.body,
        bucketName: "Photos"
    };
}
});
const upload = multer({ storage: storage })

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

router.post("/", upload.array("file"), passport.authenticate('jwt', { session: false }),  function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    postsController.create(req, res)
  }
  else {
    res.redirect("/login");
  }
});



// Matches with "/api/posts/:id"
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
  
  var token = getToken(req.headers);
  if (token) { 
    postsController.remove(req, res);
  }
});



module.exports = router;
