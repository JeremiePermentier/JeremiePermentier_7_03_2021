const JWT = require("jsonwebtoken");


function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = JWT.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  return userId;
}

module.exports.getUserId = getUserId;
