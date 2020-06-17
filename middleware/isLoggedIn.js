var expressJwt = require("express-jwt");

exports.isLoggedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "authentication",
});
