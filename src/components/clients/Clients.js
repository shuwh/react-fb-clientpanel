import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Clients extends Component {
  render() {
    const { clients } = this.props;
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6" />
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
      return <h1>Loading...</h1>;
    }
  }
}

Clients.defaultProps = {
  clients: [
    {
      id: "42342",
      firstName: "Kevin",
      lastName: "Johnson",
      email: "kevin@gmail.com",
      phone: "555-555-5555",
      balance: "100"
    },
    {
      id: "jdklfjas",
      firstName: "Kevin",
      lastName: "Johnson",
      email: "kevin@gmail.com",
      phone: "555-555-5555",
      balance: "541.12546"
    }
  ]
};

export default Clients;
