const express = require("express");
const router = express.Router();

//Accessing Controllers
const {
  getUserById,
  getUser,
  getAllUsers,
  unfollowUser,
  followUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user");

//accessing Middleware
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { isAdmin } = require("../middleware/isAdmin");

//Routes
router.param("userId", getUserById);

router.get("/user/:userId", isLoggedIn, isAuthenticated, getUser);
router.get("/users", getAllUsers);
router.get("/profile/:userId", getUserProfile);
router.put("/profile/pic/:userId", isLoggedIn, updateUserProfile);

router.put("/follow", isLoggedIn, followUser);
router.put("/unfollow", isLoggedIn, unfollowUser);

//exporting these routes
module.exports = router;
