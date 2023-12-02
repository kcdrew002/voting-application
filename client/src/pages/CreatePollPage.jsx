import React from 'react';
import { NavLink } from 'react-router-dom';

import CreatePoll from '../components/CreatePoll';
import ErrorMessage from '../components/ErrorMessage';

const CreatePollPage = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <NavLink to="/login">Login</NavLink>;

  return (
    <div>
      <ErrorMessage />
      <CreatePoll />
    </div>
  );
};

export default CreatePollPage;
