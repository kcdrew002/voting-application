const db = require('../models');

// Controller to get all polls with user details
exports.showPolls = async (req, res, next) => {
  try {
    // Retrieve polls and populate user details
    const polls = await db.Poll.find().populate('user', ['username', 'id']);
    // .populate('voted', ['username', 'id']); // Commented out for now

    // Send the polls as JSON response
    return res.status(200).json(polls);
  } catch (err) {
    // Handle errors by passing them to the next middleware
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Controller to get polls associated with a specific user
exports.usersPolls = async (req, res, next) => {
  const { id } = req.decoded;
  try {
    // Find user by ID and populate associated polls
    const user = await db.User.findById(id).populate('polls');

    // Send the user's polls as JSON response
    return res.status(200).json(user.polls);
  } catch (err) {
    // Handle errors by passing them to the next middleware
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Controller to create a new poll
exports.createPoll = async (req, res, next) => {
  const { id } = req.decoded;
  const { question, options } = req.body;
  try {
    // Find user by ID
    const user = await db.User.findById(id);
    // Create a new poll with options and associate it with the user
    const poll = await db.Poll.create({
      question,
      user,
      options: options.map(option => ({ option, votes: 0 })),
    });
    // Update user's polls array
    user.polls.push(poll._id);
    await user.save();

    // Send the newly created poll as JSON response
    return res.status(201).json({ ...poll._doc, user: user._id });
  } catch (err) {
    // Handle errors by passing them to the next middleware
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Controller to vote on a poll
exports.vote = async (req, res, next) => {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  const { answer } = req.body;
  try {
    if (answer) {
      // Find the poll by ID
      const poll = await db.Poll.findById(pollId);
      if (!poll) throw new Error('No poll found');

      // Update votes based on the provided answer
      const vote = poll.options.map(
        option =>
          option.option === answer
            ? {
                option: option.option,
                _id: option._id,
                votes: option.votes + 1,
              }
            : option,
      );

      // Check if the user has already voted
      if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
        // Update poll with the vote and mark user as voted
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();

        // Send the updated poll as JSON response
        return res.status(202).json(poll);
      } else {
        throw new Error('Already voted');
      }
    } else {
      throw new Error('No Answer Provided');
    }
  } catch (err) {
    // Handle errors by passing them to the next middleware
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Controller to get details of a specific poll
exports.getPoll = async (req, res, next) => {
  try {
    // Find the poll by ID and populate user details
    const { id } = req.params;
    const poll = await db.Poll.findById(id).populate('user', [
      'username',
      'id',
    ]);
    // .populate('voted', ['username', 'id']); // Commented out for now
    if (!poll) throw new Error('No poll found');

    // Send the poll details as JSON response
    return res.status(200).json(poll);
  } catch (err) {
    // Handle errors by passing them to the next middleware
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// Controller to delete a specific poll
exports.deletePoll = async (req, res, next) => {
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;
  try {
    // Find the user by ID
    let user = await db.User.findById(userId);
    if (user.polls) {
      // Filter out the deleted poll from the user's polls array
      user.polls = user.polls.filter(userPoll => {
        return userPoll._id.toString() !== pollId.toString();
      });
    }

    // Find the poll by ID
    const poll = await db.Poll.findById(pollId);
    if (!poll) throw new Error('No poll found');

    // Check if the user has authorization to delete the poll
    if (poll.user.toString() !== userId) {
      throw new Error('Unauthorized access');
    }

    // Save user changes and remove the poll
    await user.save();
    await poll.remove();

    // Send a success message as JSON response
    return res.status(202).json({ poll, deleted: true });
  } catch (err) {
    // Handle errors by passing them to the next middleware
    return next({
      status: 400,
      message: err.message,
    });
  }
};
