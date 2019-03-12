import * as actionTypes from "../actions/actionTypes";

export const setDisableBalanceOnAdd = () => ({
  type: actionTypes.DISABLE_BALANCE_ADD
});

export const setDisableBalanceOnEdit = () => ({
  type: actionTypes.DISABLE_BALANCE_EDIT
});

export const setAllowRegistration = () => ({
  type: actionTypes.ALLOW_REGISTRATION
});
