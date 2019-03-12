import * as actionTypes from "../actions/actionTypes";

// const initialState = {
//   disableBalanceAdd: true,
//   disableBalanceEdit: false,
//   allowRegistration: false
// };

const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DISABLE_BALANCE_ADD:
      return {
        ...state,
        disableBalanceAdd: action.payload
      };
    case actionTypes.DISABLE_BALANCE_EDIT:
      return {
        ...state,
        disableBalanceEdit: action.payload
      };
    case actionTypes.ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload
      };
    default:
      return state;
  }
};

export default settingsReducer;
