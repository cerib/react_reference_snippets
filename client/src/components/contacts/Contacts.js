import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ContactItem from "./ContactItem";
import { getContacts } from "../../redux/actions";

import Spinner from "../layout/Spinner";

const Contacts = () => {
  const dispatch = useDispatch();
  const dispatchGetContacts = useDispatch();
  const contacts = useSelector((state) => state.contacts).contacts;
  const filtered = useSelector((state) => state.contacts.filtered);
  const loading = useSelector((state) => state.contacts.loading);
  const [contactsToDisplay, setcontactsToDisplay] = useState(contacts);

  useEffect(() => {
    if (filtered !== null) {
      setcontactsToDisplay(filtered);
    } else {
      setcontactsToDisplay(contacts);
    }
  }, [dispatch, filtered, contacts]);

  useEffect(() => {
    dispatchGetContacts(getContacts());
  }, [dispatchGetContacts]);

  if (loading) {
    return <Spinner />;
  }
  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <>
      {contactsToDisplay.map((contact) => (
        <ContactItem contact={contact} key={contact._id} />
      ))}
    </>
  );
};

export default Contacts;
