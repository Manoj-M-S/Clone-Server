const User = require("../models/user");
const Post = require("../models/post");

//middleware
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "No user found!",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUserProfile = (req, res) => {
  const username = req.profile.name;
  const useremail = req.profile.email;
  const followers = req.profile.followers;
  const following = req.profile.following;
  const profile = req.profile.photo;

  Post.find({ postedBy: req.profile.name }).exec((error, posts) => {
    if (error) {
      return res.status(400).json({
        error: "No post Found",
      });
    }
    const len = posts.length;
    res.json({
      followers,
      following,
      posts,
      username,
      useremail,
      len,
      profile,
    });
  });
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((error, users) => {
    if (error || !users) {
      return res.status(400).json({
        error: "No users found!",
      });
    }
    res.json(users);
  });
};

exports.followUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.name } },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(422).json({
          error: err,
        });
      }
      User.findByIdAndUpdate(
        req.body.id,
        { $push: { following: req.body.username } },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(422).json({
            error: err,
          });
        });
    }
  );
};

exports.unfollowUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    { $pull: { followers: req.body.name } },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(422).json({
          error: err,
        });
      }
      User.findByIdAndUpdate(
        req.body.id,
        { $pull: { following: req.body.username } },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(422).json({
            error: err,
          });
        });
    }
  );
};

exports.updateUserProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.profile._id,
    { photo: req.body.photo },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(422).json({
          error: err,
        });
      }
      res.json(result);
    }
  )
  .catch((err) => {
    return res.status(422).json({ error: err });
  });
};
