const express = require("express");
const router = express.Router();

//Controllers
const {
  createPost,
  getAllPosts,
  getMyPosts,
  getPost,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
  getSubPosts,
} = require("../controllers/post");
const { getUserById } = require("../controllers/user");

//Middleware
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { isAuthenticated } = require("../middleware/isAuthenticated");

router.param("userId", getUserById);
router.param("postId", getPostById);

//Post route
router.post("/create/post/:userId", isLoggedIn, isAuthenticated, createPost);

router.put("/like", likePost);
router.put("/unlike", unlikePost);
router.put("/comment", commentPost);
router.put("/comment/delete", deleteComment);

router.get("/posts", getAllPosts);
router.get("/feed", getSubPosts);

router.get("/post/:postId/:userId", isLoggedIn, isAuthenticated, getPost);

router.get("/myposts/:userId", isLoggedIn, isAuthenticated, getMyPosts);

router.put(
  "/post/update/:userId/:postId",
  isLoggedIn,
  isAuthenticated,
  updatePost
);

router.delete(
  "/post/delete/:userId/:postId",
  isLoggedIn,
  isAuthenticated,
  deletePost
);

//Exporting the Routes
module.exports = router;
