const {
  getAuthenticatedUser,
} = require("../../../helpers/authenticationHelpers");
const {
  getCustomError,
  validateContentTypeHeader,
  validateAcceptHeader,
} = require("../../../helpers/errorHandler");

async function getCurrentInteger(req, res, db) {
  if (!validateContentTypeHeader(req.headers)) {
    return res.status(415).json(getCustomError(415));
  }

  if (!validateAcceptHeader(req.headers)) {
    return res.status(406).json(getCustomError(406));
  }

  const authenticatedUser = getAuthenticatedUser(req.headers);

  if (!authenticatedUser) {
    return res.status(401).json(getCustomError(401));
  }

  const record = await db
    .first()
    .from("users")
    .where("email", authenticatedUser.email);

  if (!record || (!record.integer && record.integer !== 0)) {
    return res.status(204).json(getCustomError(204));
  }

  return res.json({
    data: {
      type: "integer",
      id: `${record.id}`,
      attributes: {
        value: record.integer
      }
    },
  });
}

module.exports = getCurrentInteger;
