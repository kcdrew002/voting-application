const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { connect } = mongoose;
mongoose.Promise = global.Promise;
connect(process.env.DATABASE);

const { User, Poll } = require('./models');

const users = [
  { username: 'username', password: 'password' },
  { username: 'kevin', password: 'password' },
];

const polls = [
  {
    question: 'Which is the best JavaScript framework',
    options: ['Angular', 'React', 'VueJS'],
  },
  { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
  { question: 'Truth or dare', options: ['Truth', 'Dare'] },
  { question: 'Boolean?', options: ['True', 'False'] },
];

const seed = async () => {
  try {
    await User.deleteMany();
    console.log('Deleted all users');

    await Poll.deleteMany();
    console.log('Deleted all polls');

    await Promise.all(
      users.map(async (user) => {
        const createdUser = new User(user);
        await createdUser.save();
      }),
    );
    console.log('Created users:', JSON.stringify(users));

    await Promise.all(
      polls.map(async (poll) => {
        poll.options = poll.options.map((option) => ({ option, votes: 0 }));
        const createdPoll = new Poll(poll);
        const user = await User.findOne({ username: 'username' });
        createdPoll.user = user;
        user.polls.push(createdPoll._id);
        await user.save();
        await createdPoll.save();
      }),
    );
    console.log('Created polls:', JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
