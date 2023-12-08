const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { connect } = mongoose;
mongoose.Promise = global.Promise;
connect(process.env.DATABASE);

const { User, Poll } = require('./models');

const users = [
  { username: 'kcdrew002@gmail.com', password: 'password' },
  { username: 'tr@gmail.com', password: 'securepassword' },
  { username: 'hrt@gmail.com', password: 'badpassword' },
  { username: 'sey@gmail.com', password: 'goodpassword' },
  { username: 'key@gmail.com', password: 'okaypassword' },
];

const polls = [
  {
    question: 'Which is the best JavaScript framework',
    options: ['Angular', 'React', 'VueJS'],
  },
  { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
  { question: 'Truth or dare', options: ['Truth', 'Dare'] },
  { question: 'Boolean?', options: ['True', 'False'] },
  { question: 'HTML stands for?', options: ['HyperText Markup Language', 'High-level Text Manipulation Language'] },
  { question: 'What is the capital of France?', options: ['Paris', 'Berlin'] },
  { question: 'Is the Earth flat?', options: ['False', 'True'] },
  { question: 'In JavaScript, what does the "DOM" stand for?', options: ['Document Object Model', 'Data Object Model'] },
  { question: 'Who wrote "Romeo and Juliet"?', options: ['William Shakespeare', 'Jane Austen'] },
  { question: 'What is the largest planet in our solar system?', options: ['Jupiter', 'Saturn'] },
  { question: 'Python is a programming language named after a snake. (Boolean?)', options: ['True', 'False'] },
  { question: 'Which programming language is known for its simplicity and readability?', options: ['Python', 'C++'] },
  { question: 'The Great Wall of China is visible from the Moon. (Boolean?)', options: ['False', 'True'] }
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
        const user = await User.findOne({ username: 'kcdrew002@gmail.com' });
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
