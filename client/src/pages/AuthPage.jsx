import React from 'react';
import { NavLink } from 'react-router-dom';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) return <NavLink to="/">Home</NavLink>;

  return (
    <div>
      <ErrorMessage />
      <Auth authType={authType} />
    </div>
  );
};

export default AuthPage;
