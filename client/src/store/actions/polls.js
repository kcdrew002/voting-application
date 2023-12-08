// Import the API service for making requests to the server
import API from '../../services/api';

// Import action types
import { SET_POLLS, SET_CURRENT_POLL } from '../actionTypes';

// Import error-related actions
import { addError, removeError } from './error';

// Action creator to set polls in the Redux store
export const setPolls = polls => ({
  type: SET_POLLS,
  polls,
});

// Action creator to set the current poll in the Redux store
export const setCurrentPoll = poll => ({
  type: SET_CURRENT_POLL,
  poll,
});

// Async action to fetch all polls from the server
export const getPolls = () => {
  return async dispatch => {
    try {
      // Make a GET request to the 'polls' endpoint
      const polls = await API.call('get', `polls`);
      
      // Dispatch the setPolls action to update the Redux store with the fetched polls
      dispatch(setPolls(polls));

      // Remove any existing error from the Redux store
      dispatch(removeError());
    } catch (err) {
      // Handle errors by dispatching the addError action with the error message
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};

// Async action to fetch polls associated with the current user
export const getUserPolls = () => {
  return async dispatch => {
    try {
      // Make a GET request to the 'polls/user' endpoint
      const polls = await API.call('get', 'polls/user');
      
      // Dispatch the setPolls action to update the Redux store with the fetched user polls
      dispatch(setPolls(polls));

      // Remove any existing error from the Redux store
      dispatch(removeError());
    } catch (err) {
      // Handle errors by dispatching the addError action with the error message
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};

// Async action to create a new poll
export const createPoll = data => {
  return async dispatch => {
    try {
      // Make a POST request to the 'polls' endpoint with the poll data
      const poll = await API.call('post', 'polls', data);
      
      // Dispatch the setCurrentPoll action to update the Redux store with the created poll
      dispatch(setCurrentPoll(poll));

      // Remove any existing error from the Redux store
      dispatch(removeError());
    } catch (err) {
      // Handle errors by dispatching the addError action with the error message
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};

// Async action to fetch details of a specific poll
export const getCurrentPoll = path => {
  return async dispatch => {
    try {
      // Make a GET request to the 'polls/:path' endpoint to get the poll details
      const poll = await API.call('get', `polls/${path}`);
      
      // Dispatch the setCurrentPoll action to update the Redux store with the fetched poll details
      dispatch(setCurrentPoll(poll));

      // Remove any existing error from the Redux store
      dispatch(removeError());
    } catch (err) {
      // Handle errors by dispatching the addError action with the error message
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};

// Async action to submit a vote for a specific poll
export const vote = (path, data) => {
  return async dispatch => {
    try {
      // Make a POST request to the 'polls/:path' endpoint to submit a vote
      const poll = await API.call('post', `polls/${path}`, data);
      
      // Dispatch the setCurrentPoll action to update the Redux store with the updated poll after voting
      dispatch(setCurrentPoll(poll));
    } catch (err) {
      // Handle errors by dispatching the addError action with the error message
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};
