import {
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const idToDelete = action.payload;
      const newState = { ...state };
      delete newState[idToDelete];
      return newState;
    case FETCH_STREAMS:
      const fetchedStreams = {};
      action.payload.forEach((element) => {
        fetchedStreams[element.id] = element;
      });
      return fetchedStreams;
    default:
      return state;
  }
};
