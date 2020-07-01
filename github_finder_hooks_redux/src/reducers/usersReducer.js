export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    case "SEARCH_USERS":
      return action.payload;
    case "CLEAR_USERS":
      return [];
    default:
      return state;
  }
};
