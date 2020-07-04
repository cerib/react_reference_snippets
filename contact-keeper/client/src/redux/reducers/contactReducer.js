import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  FILTER_CONTACTS,
  UPDATE_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  GET_CONTACTS,
  LOGOUT,
} from "../types";

const defaultState = {
  contacts: [],
  current: {},
  filtered: null,
  loading: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: {},
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          //if id of payload is id of contact in state, we will update it (return payload)
          //else, just return contact
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };
    case FILTER_CONTACTS:
      const filtered = [];
      state.contacts.forEach((contact) => {
        const regex = new RegExp(`${action.payload}`, "gi");
        if (contact.name.match(regex) || contact.email.match(regex)) {
          filtered.push(contact);
        } else if (action.payload && contact.phone) {
          const phoneRegex = new RegExp(
            `${action.payload.replace(/\s|-/gi, "")}`
          );
          const phone = contact.phone.replace(/\s|-/gi, "");
          if (phone.match(phoneRegex)) {
            filtered.push(contact);
          }
        }
      });
      return {
        ...state,
        filtered: filtered,
      };
    case CLEAR_FILTER:
      return { ...state, filtered: null };
    case LOGOUT:
      return { ...defaultState };
    default:
      return state;
  }
};
