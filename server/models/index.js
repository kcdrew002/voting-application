// Import the mongoose library
const mongoose = require('mongoose');

// Enable debugging for mongoose
mongoose.set('debug', true);

// Set the global promise to the built-in Node.js promise
mongoose.Promise = global.Promise;

// Connect to the MongoDB database using the provided connection string
mongoose.connect(process.env.DATABASE);

// Export the User and Poll models from their respective files
module.exports.User = require('./user');
module.exports.Poll = require('./poll');
