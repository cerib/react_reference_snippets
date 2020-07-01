import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import userReducer from "./userReducer";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  users: usersReducer,
  user: userReducer,
  loading: loadingReducer,
});
