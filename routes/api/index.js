const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users")

// Book routes
router.use("/users", userRoutes);
router.use("/books", bookRoutes);


module.exports = router;
