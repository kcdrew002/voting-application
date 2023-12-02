// Import the necessary modules
const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth');

// Define routes for handling polls
router
  .route('/')
  .get(handle.showPolls) // Get all polls
  .post(auth, handle.createPoll); // Create a new poll (requires authentication)

// Get polls associated with a specific user (requires authentication)
router.get('/user', auth, handle.usersPolls);

// Define routes for handling a specific poll by ID
router
  .route('/:id')
  .get(handle.getPoll) // Get details of a specific poll
  .post(auth, handle.vote) // Vote on a specific poll (requires authentication)
  .delete(auth, handle.deletePoll); // Delete a specific poll (requires authentication)

// Export the router for use in other parts of the application
module.exports = router;
