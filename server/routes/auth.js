// Import the necessary modules
const router = require('express').Router();
const handle = require('../handlers');

// Route to get all users (for development only)
router.get('/', handle.getUsers);

// Route for user login
router.post('/login', handle.login);

// Route for user registration
router.post('/register', handle.register);

// Export the router for use in other parts of the application
module.exports = router;
