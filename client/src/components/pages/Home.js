import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

import { loadUser } from "../../redux/actions";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className="grid-2">
      <div>
        <ContactForm></ContactForm>
      </div>
      <div className="">
        <ContactFilter></ContactFilter>
        <Contacts></Contacts>
      </div>
    </div>
  );
};
export default Home;
