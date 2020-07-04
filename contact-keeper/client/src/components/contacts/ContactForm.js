import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addContact, clearCurrent, updateContact } from "../../redux/actions";

function ContactForm() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const dispatch = useDispatch();
  const { name, email, phone, type } = contact;
  const current = useSelector((state) => state.contacts).current;

  useEffect(() => {
    if (current._id !== undefined) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current._id, current]);

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (current._id === undefined) {
      dispatch(addContact(contact));
    } else {
      dispatch(updateContact(contact));
      dispatch(clearCurrent());
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const onClearClick = () => {
    dispatch(clearCurrent());
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current._id ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="enter a name"
        value={name}
        required
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        placeholder="enter an email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="enter a phone"
        value={phone}
        onChange={onChange}
      />
      <h4>Contact Type</h4>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional{" "}
      <div className="">
        <input
          type="submit"
          value={current._id ? "Update" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current._id ? (
        <div>
          <button className="btn btn-light btn-block" onClick={onClearClick}>
            Clear
          </button>
        </div>
      ) : null}
    </form>
  );
}

export default ContactForm;
