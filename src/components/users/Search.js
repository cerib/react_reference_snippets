import React, { useState } from "react";

export default function Search(props) {
  const [text, setText] = useState("");

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(text);
    setText("");
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={text}
          onChange={onChange}
        ></input>
        <input type="submit" className="btn btn-dark btn-block" />
      </form>
    </div>
  );
}
