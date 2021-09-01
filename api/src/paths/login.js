const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/authenticationHelpers");
const {
  getCustomError,
  validateAcceptHeader,
  validateContentTypeHeader,
} = require("../helpers/errorHandler");

async function loginUser(req, res, db) {
  if (!validateContentTypeHeader(req.headers)) {
    return res.status(415).json(getCustomError(415));
  }

  if (!validateAcceptHeader(req.headers)) {
    return res.status(406).json(getCustomError(406));
  }

  if (
    !req.body ||
    !req.body.data ||
    !req.body.data.email ||
    !req.body.data.password
  ) {
    return res.status(400).json(getCustomError(400));
  }

  const record = await db
    .first()
    .from("users")
    .where("email", req.body.data.email);

  if (!record) {
    return res.status(401).json(getCustomError(401));
  }

  const isValidUser = await bcrypt.compare(
    req.body.data.password,
    record.password
  );

  if (!isValidUser) {
    return res.status(401).json(getCustomError(401));
  }

  const userToLogin = {
    email: req.body.data.email,
  };

  const accessToken = generateAccessToken(userToLogin);

  return res.json({
    data: {
      id: "1",
      type: "token",
      attributes: {
        value: accessToken,
      },
    },
  });
}

module.exports = loginUser;
