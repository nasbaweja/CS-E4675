const logger = require("./log");

const requestLogger = (request, response, next) => {
  logger.info("method:", request.method);
  logger.info("route:  ", request.path);
  logger.info("body:  ", request.body);
  next();
};

const endpointUnknown = (request, response) => {
  response.status(404).send({ error: "Wrong Path" });
};

const handleErrors = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.slice(7);
    return next();
  }
  request.token = null;
  return next();
};

module.exports = {
  requestLogger,
  endpointUnknown,
  handleErrors,
  tokenExtractor,
};
