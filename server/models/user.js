// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema with necessary fields and properties
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  // Reference to Poll model using ObjectIds for the polls associated with the user
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
});

// Middleware to hash the user's password before saving to the database
userSchema.pre('save', async function(next) {
  try {
    // Check if the password field is modified
    if (!this.isModified('password')) {
      return next();
    }
    // Hash the password using bcrypt with a cost factor of 10
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    // Pass any errors to the next middleware
    return next(err);
  }
});

// Method to compare a given password attempt with the user's hashed password
userSchema.methods.comparePassword = async function(attempt, next) {
  try {
    // Use bcrypt to compare the provided password attempt with the stored hashed password
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    // Pass any errors to the next middleware
    return next(err);
  }
};

// Export the User model with the defined schema
module.exports = mongoose.model('User', userSchema);
