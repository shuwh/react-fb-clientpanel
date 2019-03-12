import * as actionTypes from '../actions/actionTypes'

const initialState = {
  message: null,
  messageType: null,
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
      }
    default:
      return state;
  }
}

export default notifyReducer;
