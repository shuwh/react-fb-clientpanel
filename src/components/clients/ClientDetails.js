import React, { Component } from "react";
import PropTypes from 'prop-types'

import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from '../layout/Spinner'

import classnames from 'classnames'

export class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  onDelete = () => {
    const { firestore, history, client } = this.props;
    firestore.delete({ collection: 'clients', doc: client.id })
      .then(() => history.push('/'));
  }


  balanceSubmit = (e) => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;
    const balanceUpdated = {
      balance: parseFloat(balanceUpdateAmount),
    }
    firestore.update({ collection: 'clients', doc: client.id }, balanceUpdated);
  }



  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;
    let balanceForm = null;
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id='balanceUpdateAmount'
              value={balanceUpdateAmount}
              placeholder='Enter The New Balance'
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input type="submit" value="Update" className='btn btn-outline-dark' />
            </div>
          </div>
        </form>
      )
    } else {
      balanceForm = null;
    }
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to='/' className='btn btn-link'>
                <i className="fas fa-arrow-circle-left"></i>  Back To DashBoard
            </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link className="btn btn-dark" to={`/client/edit/${client.id}`}>Edit</Link>
                <button onClick={this.onDelete} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              <h3>
                {client.firstName} {client.lastName}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID: <span className='text-secondary'>{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className=''>
                    Balance:
                    {' '}
                    <span className={classnames({
                      'text-danger': client.balance > 0,
                      'text-success': client.balance === 0,
                    })}>${parseFloat(client.balance).toFixed(2)}
                    </span>
                    {' '}
                    <a href="#!" onClick={() => this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate })}>
                      <small>
                        <i className="fas fa-pencil-alt"></i>
                      </small>
                    </a>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">Contact Email: {client.email}</li>
                <li className="list-group-item">Contact Phone: {client.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', doc: props.match.params.id, storeAs: 'client' }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  })),
)(ClientDetails)
