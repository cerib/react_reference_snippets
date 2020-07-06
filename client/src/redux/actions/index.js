import axios from "axios";
import { v4 as uuid } from "uuid";
import * as types from "../types";

import setAuthToken from "../../utils/setAuthToken";

//contacts
export const addContact = (contact) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post("/api/contacts", contact, config);
    dispatch({ type: types.ADD_CONTACT, payload: response.data });
  } catch (error) {
    dispatch(
      setAlert(
        "Server Error: Add Contact failed, please try again later",
        "danger"
      )
    );
  }
};

export const getContacts = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/contacts");
    dispatch({ type: types.GET_CONTACTS, payload: response.data });
  } catch (error) {
    dispatch(
      setAlert(
        "Server Error: Failed to get contacts, please try again later",
        "danger"
      )
    );
  }
};

export const updateContact = (contact) => async (dispatch) => {
  //dispatch({ type: types.UPDATE_CONTACT, payload: contact });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );
    console.log(response.data);
    dispatch({ type: types.UPDATE_CONTACT, payload: response.data });
  } catch (error) {
    dispatch(
      setAlert(
        "Server Error: Update Contact failed, please try again later",
        "danger"
      )
    );
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch({ type: types.DELETE_CONTACT, payload: id });
  } catch (error) {
    dispatch(
      setAlert(
        "Server Error: Failed to delete contact, please try again later",
        "danger"
      )
    );
  }
};

export const setCurrent = (contact) => {
  return { type: types.SET_CURRENT, payload: contact };
};

export const clearCurrent = () => {
  return { type: types.CLEAR_CURRENT };
};

export const filterContacts = (text) => {
  return { type: types.FILTER_CONTACTS, payload: text };
};

export const clearFilter = () => {
  return { type: types.CLEAR_FILTER };
};

//alerts
export const setAlert = (msg, type) => (dispatch) => {
  const id = uuid();
  dispatch({ type: types.SET_ALERT, payload: { msg, type, id } });
  //automatically remove alert after n milliseconds
  setTimeout(() => dispatch({ type: types.REMOVE_ALERT, payload: id }), 10000);
};

//users, auth

export const registerUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("/api/users", formData, config);
    dispatch({ type: types.REGISTER_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.REGISTER_FAIL, payload: error.response.data.msg });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("/api/auth", formData, config);
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.response.data.msg });
  }
};

export const logoutUser = () => {
  return { type: types.LOGOUT };
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: types.USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: types.AUTH_ERROR });
    }
  }
};

export const clearErrors = () => {
  return { type: types.CLEAR_ERRORS };
};
