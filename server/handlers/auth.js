// Require the models and JWT library
const db = require('../models');
const jwt = require('jsonwebtoken');

// Get all users - for development only
exports.getUsers = async (req, res, next) => {
  try {
    // Find all users using the User model
    const users = await db.User.find();

    // Return the users as a JSON response with status code 200
    return res.status(200).json(users);
  } catch (err) {
    // Handle any errors
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Register a new user
exports.register = async (req, res, next) => {
  try {
    // Create a new user using the User model and the data sent in the request body
    const user = await db.User.create(req.body);

    // Extract the user ID and username
    const { id, username } = user;

    // Generate a JWT token using the user's ID and username and the secret environment variable
    const token = jwt.sign({ id, username }, process.env.SECRET);

    // Return the user information and token as a JSON response with status code 201
    return res.status(201).json({
      id,
      username,
      token,
    });
  } catch (err) {
    // Handle any errors
    if (err.code === 11000) {
      // If the error code is 11000, it means the username is already taken
      err.message = 'Sorry, that username is already taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Login a user
exports.login = async (req, res, next) => {
  try {
    // Find the user by username using the User model
    const user = await db.User.findOne({
      username: req.body.username,
    });

    // Extract the user ID and username
    const { id, username } = user;

    // Compare the password entered by the user with the stored password
    const valid = await user.comparePassword(req.body.password);

    // If the password is valid
    if (valid) {
      // Generate a JWT token using the user's ID and username and the secret environment variable
      const token = jwt.sign({ id, username }, process.env.SECRET);

      // Return the user information and token as a JSON response with status code 200
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      // If the password is invalid
      throw new Error();
    }
  } catch (err) {
    // Handle any errors
    return next({
      status: 400,
      message: 'Invalid Username/Password',
    });
  }
};
