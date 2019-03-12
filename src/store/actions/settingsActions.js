import * as actionTypes from "../actions/actionTypes";

export const setDisableBalanceOnAdd = () => {
  // Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Toggle settings
  settings.disableBalanceAdd = !settings.disableBalanceAdd;

  // Set local storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: actionTypes.DISABLE_BALANCE_ADD,
    payload: settings.disableBalanceAdd
  };
};

export const setDisableBalanceOnEdit = () => {
  // Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Toggle settings
  settings.disableBalanceEdit = !settings.disableBalanceEdit;

  // Set local storage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: actionTypes.DISABLE_BALANCE_EDIT,
    payload: settings.disableBalanceEdit
  };
};

export const setAllowRegistration = () => {
  // Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Toggle settings
  settings.allowRegistration = !settings.allowRegistration;

  // Set local storage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: actionTypes.ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};
