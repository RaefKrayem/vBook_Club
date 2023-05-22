const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // req.headers.authorization header is formatted like this: "Bearer token"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token. the token contains the userID
      const getUserQuery = "SELECT * FROM users WHERE id = ?";
      db.query(getUserQuery, [decoded.id], async (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          req.user = {
            id: results[0].id,
            username: results[0].username,
            email: results[0].email,
            profile: results[0].profile,
            // created_at: results[0].created_at,
          };
          next();
        }
      });
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token ");
  }
});

module.exports = {
  protect,
};
