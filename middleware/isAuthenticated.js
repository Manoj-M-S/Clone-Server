exports.isAuthenticated = (req, res, next) => {
  let checker =
    req.profile &&
    req.authentication &&
    req.profile._id == req.authentication._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
