import * as actionTypes from './actionTypes'

export const notifyUser = (message, messageType) => {
  return {
    type: actionTypes.NOTIFY_USER,
    message,
    messageType,
  }
}
