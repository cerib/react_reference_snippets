export default (
  state = {
    user: {},
    repos: [],
  },
  action
) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, user: action.payload }; //action.payload;
    case "FETCH_USER_REPOS":
      return { ...state, repos: action.payload };
    default:
      return state;
  }
};
