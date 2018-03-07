import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from '../utils/db';
import { updateByPropertyName } from '../utils/funcs';

const INITIAL_STATE = { username: '', email: '', passwordOne: '', passwordTwo: '', error: null };

const full_width = { minWidth: '100%' };

const half_width = { minWidth: '50%' };

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db
          .doCreateUser(authUser.uid, username, email)
          .then(() =>
            this.setState(() => ({ ...INITIAL_STATE }), () => history.push('/jobs-table'))
          )
          .catch(error => this.setState(updateByPropertyName('error', error)));
      })
      .catch(error => this.setState(updateByPropertyName('error', error)));
    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || username === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div style={full_width}>
          <input
            style={half_width}
            value={username}
            onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
            type="text"
            placeholder="Full Name"
          />
          <input
            style={half_width}
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            style={half_width}
            value={passwordOne}
            onChange={event =>
              this.setState(updateByPropertyName('passwordOne', event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <input
            style={half_width}
            value={passwordTwo}
            onChange={event =>
              this.setState(updateByPropertyName('passwordTwo', event.target.value))
            }
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <input
          style={full_width}
          type={'button'}
          disabled={isInvalid}
          type={'submit'}
          value={'sign up'}
        />
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignUpForm);