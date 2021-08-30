const jwt = require("jsonwebtoken");

function generateAccessToken(payload) {
  return jwt.sign(JSON.stringify(payload), "secrettoken");
}

function getAuthenticatedUser(headers) {
  let currentUser = null;

  if (!headers || !headers.authorization) {
    return currentUser;
  }

  const token = headers.authorization.split(" ")[1];

  if (!token) {
    return currentUser;
  }

  jwt.verify(token, "secrettoken", (err, decoded) => {
    if (!err && decoded) {
      currentUser = decoded;
    }
  });

  return currentUser;
}

module.exports = {
  generateAccessToken,
  getAuthenticatedUser,
};
