const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/authenticationHelpers");
const {
  getCustomError,
  validateContentTypeHeader,
  validateAcceptHeader,
} = require("../helpers/errorHandler");

async function registerUser(req, res, db) {
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

  const hashedPassword = await bcrypt.hash(req.body.data.password, 10);

  const userToRegister = {
    email: req.body.data.email,
    password: hashedPassword,
  };

  try {
    await db("users").insert(userToRegister);
  } catch (e) {
    return res.status(500).json(getCustomError(500));
  }
  const accessToken = generateAccessToken({ email: req.body.data.email });

  return res.json({
    data: {
      id: '1',
      type: 'token',
      attributes: {
        value: accessToken
      }
    },
  });
}

module.exports = registerUser;
