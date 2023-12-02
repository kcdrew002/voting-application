import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getPolls, getUserPolls } from '../store/actions';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      const { getPolls, getUserPolls } = this.props;
      getPolls();
    }
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/poll/${id}`);
  }

  render() {
    const { auth } = this.props;
    const polls = this.props.polls || []; // Check if polls array exists

    const pollsList = polls.map((poll) => (
      <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>
        {poll.question}
      </li>
    ));

    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div className="buttons_center">
            <button className="button" onClick={getPolls}>
              All polls
            </button>
            <button className="button" onClick={getUserPolls}>
              My polls
            </button>
          </div>
        )}
        <ul className="polls">{pollsList}</ul>
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls },
)(Polls);
