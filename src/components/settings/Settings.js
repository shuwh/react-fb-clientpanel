import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions";

class Settings extends Component {
  render() {
    const {
      disableBalanceAdd,
      disableBalanceEdit,
      allowRegistration
    } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashbaord
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="disableBalanceOnAdd">
                  Disable Balance On Add
                </label>
                <input
                  type="checkbox"
                  id="disableBalanceOnAdd"
                  checked={!!disableBalanceAdd}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  onDisableBalanceOnAdd: () => dispatch(actions.setDisableBalanceOnAdd()),
  onDisableBalanceOnEdit: () => dispatch(actions.setDisableBalanceOnEdit()),
  onSetAllowRegistration: () => dispatch(actions.setAllowRegistration())
});

Settings.propsTypes = {
  settings: PropTypes.object.isRequired,
  onDisableBalanceOnAdd: PropTypes.func.isRequired,
  onDisableBalanceOnEdit: PropTypes.func.isRequired,
  onSetAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);