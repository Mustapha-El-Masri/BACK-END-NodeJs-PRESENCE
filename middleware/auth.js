const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res
          .status(400)
          .json({ succcess: false, message: "token not exist" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not Allowed to do that");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };
