const { getAuthenticatedUser } = require("../../helpers/authenticationHelpers");
const {
  getCustomError,
  validateContentTypeHeader,
  validateAcceptHeader,
} = require("../../helpers/errorHandler");

async function getNextInteger(req, res, db) {
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

  const records = await db
    .from("users")
    .where("email", authenticatedUser.email)
    .increment("integer", 1)
    .returning("*");

  if (!records || !records.length || !records[0] || !records[0].integer) {
    return res.status(204).json(getCustomError(204));
  }

  return res.json({
    data: {
      id: `${records[0].id}`,
      type: 'integer',
      attributes: {
        value: records[0].integer
      }
    },
  });
}

module.exports = getNextInteger;
