import * as actionTypes from "../actions/actionTypes";

const initialState = {
  disableBalanceAdd: true,
  disableBalanceEdit: false,
  allowRegistration: false
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISABLE_BALANCE_ADD:
      return {
        ...state,
        disableBalanceAdd: !state.disableBalanceAdd
      };
    case actionTypes.DISABLE_BALANCE_EDIT:
      return {
        ...state,
        disableBalanceEdit: !state.disableBalanceEdit
      };
    case actionTypes.ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: state.allowRegistration
      };
    default:
      return state;
  }
};

export default settingsReducer;
