// Import the auth and poll modules
const auth = require('./auth');
const poll = require('./poll');

// Combine the auth and poll exports into a single object
module.exports = {
  ...auth,
  ...poll,
};

// Define a custom error handler middleware
module.exports.error = (err, req, res, next) => {
  // Determine the status code
  const statusCode = err.status || 500;

  // Prepare the error response
  const response = {
    success: false,
    error: {
      message: err.message || 'Something went wrong.',
    },
  };

  // Send the error response
  return res.status(statusCode).json(response);
};
