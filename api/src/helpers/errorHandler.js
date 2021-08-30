function getCustomError(status) {
  switch (status) {
    case 204:
      return {
        errors: [
          {
            status: 204,
            title: "No Content",
          },
        ],
      };
    case 400:
      return {
        errors: [
          {
            status: 400,
            title: "Bad Request",
          },
        ],
      };
    case 401:
      return {
        errors: [
          {
            status: 401,
            title: "Access Denied",
          },
        ],
      };
    case 406:
      return {
        errors: [
          {
            status: 406,
            title: "Not Acceptable",
          },
        ],
      };
    case 415:
      return {
        errors: [
          {
            status: 415,
            title: "Unsupported Media Type",
          },
        ],
      };
    default:
      return {
        errors: [
          {
            status: 500,
            title: "Internal Server Error",
          },
        ],
      };
  }
}

function validateContentTypeHeader(headers) {
  console.log(headers["content-type"]);
  if (
    !headers ||
    (headers["content-type"] !== "application/vnd.api+json" &&
      headers["content-type"] !== "application/vnd.api+json; charset=utf-8")
  ) {
    return false;
  }

  return true;
}

function validateAcceptHeader(headers) {
  if (!headers) {
    return false;
  }

  if (!headers.accept) {
    return true;
  }

  if (
    headers.accept !== "application/vnd.api+json" ||
    headers.accept !== "application/vnd.api+json; charset=utf-8"
  ) {
    return false;
  }

  return true;
}

module.exports = {
  getCustomError,
  validateContentTypeHeader,
  validateAcceptHeader,
};
