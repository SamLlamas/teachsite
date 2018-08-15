const router = require("express").Router();
const postsRoutes = require("./posts");
const userRoutes = require("./users")

// Book routes
router.use("/users", userRoutes);
router.use("/posts", postsRoutes);


module.exports = router;
