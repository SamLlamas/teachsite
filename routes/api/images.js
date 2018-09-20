const router = require("express").Router();
const postsController = require("../../controllers/postsController");
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


router.get('/data/:id', (req, res) => {
    gfs.files.find({"metadata.postnumber": req.params.id}).toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('index', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        console.log(files)
        res.json(files)
      }
    });
  });




router.get("/:id", (req, res) => {
    console.log(req.params)
    /** First check if file exists */
    gfs.files.findOne({ filename: req.params.id }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            console.log(file)
          return res.status(404).json({
            err: 'No file exists'
          });
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          });
        }
      });
});

module.exports = router;