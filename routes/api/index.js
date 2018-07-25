const router = require("express").Router();
const bookRoutes = require("./books");
const UserRoutes = require("./users")

// Book routes
router.use("/books", bookRoutes);
router.use("/users", UserRoutes);

module.exports = router;
