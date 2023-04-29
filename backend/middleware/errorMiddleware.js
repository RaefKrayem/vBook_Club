// to override the express default error handler function
// we pass these parameters
const errorHandler = (err, req, res, next) => {
  // if res.statusCode exists which means there is a client error then
  // statusCode = res.statusCode, else statusCode = 500 which is a server error
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    // message inside the err object
    message: err.message,

    // get the stack trace to get more information but only if we are in development mode
    // if we are in production mode stack: null , else stack: err.stack to give us line numbers
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
