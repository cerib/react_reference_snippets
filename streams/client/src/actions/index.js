import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams/", { ...formValues, userId });
    dispatch({ type: CREATE_STREAM, payload: response.data });
    // after getting the response move user to root (todo: error handling)
    history.push("/");
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get("/streams");
    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
};

export const fetchStream = (streamId) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${streamId}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
};

export const editStream = (streamId, formValues) => {
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${streamId}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push("/");
  };
};

export const deleteStream = (streamId) => {
  return async (dispatch) => {
    //not gonna be using response for this one
    //const response = await streams.delete(`/streams/${streamId}`);await streams.delete(`/streams/${streamId}`);
    await streams.delete(`/streams/${streamId}`);
    dispatch({ type: DELETE_STREAM, payload: streamId });
    history.push("/");
  };
};
