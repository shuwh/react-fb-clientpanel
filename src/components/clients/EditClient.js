import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from '../layout/Spinner'

export class EditClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
  };

  // static getDerivedStateFromProps(props, state) {
  //   const { client } = props;
  //   if (client) {
  //     return {
  //       firstName: client.firstName,
  //       lastName: client.lastName,
  //       email: client.email,
  //       phone: client.phone,
  //       balance: client.balance,
  //     };
  //   }
  //   return null;
  // }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.client !== this.props.client) {
      const { firstName, lastName, email, phone, balance } = this.props.client;
      this.setState({
        firstName,
        lastName,
        email,
        phone,
        balance,
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firestore, history, client } = this.props;
    const updClient = {
      ...this.state,
      balance: this.state.balance === '' ? 0 : parseFloat(this.state.balance),
    }
    firestore.update({ collection: 'clients', doc: client.id }, updClient)
      .then(() => history.push('/'));
  }



  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    })
  }


  render() {
    const { client } = this.props;
    if (client) {
      const { firstName, lastName, email, phone, balance } = this.state;
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link text-secondary">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Add Contact</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={firstName}
                    placeholder={"Enter First Name..."}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={lastName}
                    placeholder={"Enter Last Name..."}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder={"Enter Email..."}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    onChange={this.onChange}
                    value={phone}
                    placeholder={"Enter Phone..."}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    id="balance"
                    onChange={this.onChange}
                    value={balance}
                    placeholder={"Enter Balance..."}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
}

export default compose(
  firestoreConnect(props => [{
    collection: 'clients',
    doc: props.match.params.id,
    storeAs: 'client'
  }]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0],
  })),
)(EditClient);
