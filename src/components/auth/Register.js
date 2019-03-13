import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import { notifyUser } from "../../store/actions/notifyActions";
import Alert from "../layout/Alert";

export class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  componentWillMount = () => {
    const { allowRegister } = this.props.settings;
    if (!allowRegister) {
      this.props.history.push("/");
    }
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .createUser({
        email,
        password
      })
      .then(notifyUser("", ""))
      .catch(err => notifyUser("User Already Exits", "error"));
  };

  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <h1 className="text-center">
                  <span className="text-primary">
                    <i className="fas fa-lock" /> Register
                  </span>
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
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
                      id="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
