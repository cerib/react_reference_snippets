import { SET_ALERT, REMOVE_ALERT } from "../types";

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [action.payload, ...state];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
