const Post = require("../models/post");
//Middleware

exports.getPostById = (req, res, next, id) => {
  Post.findById(id).exec((error, post) => {
    if (error) {
      return res.status(400).json({
        error: "Post Not Found",
      });
    }
    req.post = post;
    next();
  });
};

exports.getPost = (req, res) => {
  return res.json(req.post);
};

exports.createPost = (req, res) => {
  const { title, body, photo, postedBy, userId } = req.body;

  if (!title || !body || !postedBy || !photo || !userId) {
    return res.status(400).json({
      error: "Please include all fields",
    });
  }
  const post = new Post({
    title,
    body,
    photo,
    postedBy,
    userId,
  });

  //Saving Post to Database
  post.save((error, post) => {
    if (error) {
      res.status(400).json({
        error: "Saving post failed",
      });
    }
    res.json(post);
  });
};

exports.getAllPosts = (req, res) => {
  Post.find().exec((error, posts) => {
    if (error) {
      return res.status(400).json({
        error: "No post Found",
      });
    }
    res.json(posts);
  });
};

exports.getSubPosts = (req, res) => {
  Post.find({ postedBy: { $in: req.profile.following } }).exec(
    (error, posts) => {
      if (error) {
        return res.status(400).json({
          error: "No post Found",
        });
      }
      res.json(posts);
    }
  );
};

exports.getMyPosts = (req, res) => {
  Post.find({ postedBy: req.profile.name }).exec((error, posts) => {
    if (error) {
      return res.status(400).json({
        error: "No post Found",
      });
    }
    res.json(posts);
  });
};

exports.updatePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { photo: req.body.photo, title: req.body.title, body: req.body.body },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(422).json({
          error: err,
        });
      }
      res.json(result);
    }
  ).catch((err) => {
    return res.status(422).json({ error: err });
  });
};

exports.deletePost = (req, res) => {
  let post = req.post;

  post.remove((error, post) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete this product",
      });
    } else {
      res.json(post);
    }
  });
};

exports.likePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { like: req.body.userId },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

exports.unlikePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { like: req.body.userId },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

exports.commentPost = (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.body.userName,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comment: comment },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

exports.deleteComment = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { comment: { _id: req.body.commentId } },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};
