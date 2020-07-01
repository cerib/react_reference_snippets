import axios from "axios";

let clientID = "";
let clientSecret = "";

if (process.env.NODE_ENV !== "production") {
  clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  clientID = process.env.GITHUB_CLIENT_ID;
  clientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const credentials = `client_id=${clientID}&client_secret=${clientSecret}`;

export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await axios.get(
    `https://api.github.com/users?${credentials}`
  );
  dispatch({ type: "FETCH_USERS", payload: response.data });
  dispatch(setLoading(false));
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await axios.get(
    `https://api.github.com/search/users?q=${searchTerm}&?${credentials}`
  );
  dispatch({ type: "SEARCH_USERS", payload: response.data.items });

  dispatch(setLoading(false));
};

export const clearUsers = () => {
  return { type: "CLEAR_USERS", payload: [] };
};

export const fetchUserAndRepos = (username) => async (dispatch) => {
  dispatch(setLoading(true));

  await dispatch(fetchUser(username));
  await dispatch(fetchUserRepos(username));

  dispatch(setLoading(false));
};

export const fetchUser = (username) => async (dispatch) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}?${credentials}`
  );
  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const fetchUserRepos = (username) => async (dispatch) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc?${credentials}`
  );
  dispatch({ type: "FETCH_USER_REPOS", payload: response.data });
};

export const setLoading = (loadingBool) => {
  return { type: "SET_LOADING", payload: loadingBool };
};
