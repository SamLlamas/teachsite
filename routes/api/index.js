const router = require("express").Router();
const postsRoutes = require("./posts");
const userRoutes = require("./users")
const imageRoutes = require("./images")

// Book routes
router.use("/users", userRoutes);
router.use("/posts", postsRoutes);
router.use("/images", imageRoutes.router);


module.exports = router;
