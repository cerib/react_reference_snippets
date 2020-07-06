import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

import { loadUser } from "../../redux/actions";

export const Home = () => {
  const state = useRef(useSelector((state) => state));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {state.current.auth.user &&
      state.current.auth.user.email === "example@example.com" ? (
        <h2 className="bg-light text-center m-2">
          You're using a read-only account
        </h2>
      ) : null}
      <div className="grid-2">
        <div>
          <ContactForm></ContactForm>
        </div>
        <div className="">
          <ContactFilter></ContactFilter>
          <Contacts></Contacts>
        </div>
      </div>
    </>
  );
};
export default Home;
