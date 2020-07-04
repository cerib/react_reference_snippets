import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterContacts, clearFilter } from "../../redux/actions";

const ContactFilter = () => {
  const dispatch = useDispatch();
  const text = useRef("");
  const filtered = useSelector((state) => state.contacts).filtered;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (event) => {
    if (text.current.value !== "") {
      dispatch(filterContacts(event.target.value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <form action="">
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
