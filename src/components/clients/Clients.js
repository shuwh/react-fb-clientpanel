import React, { Component } from "react";
import PropTypes from 'prop-types'

import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from '../layout/Spinner'

export class Clients extends Component {
  state = {
    totalOwed: null
  }

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{' '}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
            <table className="table table-striped">
              <thead className="thead-inverse">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.email}</td>
                    <td>
                      <strong>$</strong> {parseFloat(client.balance).toFixed(2)}
                    </td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fas fa-arrow-circle-right" /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Spinner />
    }
  }
}

// Clients.defaultProps = {
//   clients: [
//     {
//       id: "42342",
//       firstName: "Kevin",
//       lastName: "Johnson",
//       email: "kevin@gmail.com",
//       phone: "555-555-5555",
//       balance: "100"
//     },
//     {
//       id: "jdklfjas",
//       firstName: "Kevin",
//       lastName: "Johnson",
//       email: "kevin@gmail.com",
//       phone: "555-555-5555",
//       balance: "541.12546"
//     }
//   ]
// };

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array,
}

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
