import React, { Component } from "react";
import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import { notifyUser } from '../../store/actions/notifyActions'
import Alert from '../layout/Alert'



export class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .login({
        email,
        password,
      })
      .then(notifyUser('', ''))
      .catch(err => notifyUser('Invalid Credentials', 'error'));
  }

  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                {message ? <Alert message={message} messageType={messageType} /> : null}
                <h1 className="text-center">
                  <span className="text-primary">
                    <i className="fas fa-lock"></i> Login
                  </span>
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id='email'
                      className="form-control"
                      placeholder="Enter Your Login Email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id='password'
                      className="form-control"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </div>
                  <input type="submit" value="Login" className='btn btn-primary btn-block' />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    notify: state.notify,
  }),
    { notifyUser }),
)(Login);
