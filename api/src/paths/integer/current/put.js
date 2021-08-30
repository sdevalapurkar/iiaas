const {
  getAuthenticatedUser,
} = require("../../../helpers/authenticationHelpers");
const {
  getCustomError,
  validateAcceptHeader,
  validateContentTypeHeader,
} = require("../../../helpers/errorHandler");

async function resetCurrentInteger(req, res, db) {
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

  if (
    !req.body ||
    !req.body.data ||
    (!req.body.data.current && req.body.data.current !== 0) ||
    req.body.data.current < 0
  ) {
    return res.status(400).json(getCustomError(400));
  }

  const records = await db
    .from("users")
    .where("email", authenticatedUser.email)
    .update(
      {
        integer: req.body.data.current,
      },
      ["id", "integer"]
    );

  if (
    !records ||
    !records.length ||
    !records[0] ||
    (!records[0].integer && records[0].integer !== 0)
  ) {
    return res.status(204).json(getCustomError(204));
  }

  return res.json({
    data: {
      id: `${records[0].id}`,
      type: "integer",
      attributes: {
        value: records[0].integer
      }
    },
  });
}

module.exports = resetCurrentInteger;
