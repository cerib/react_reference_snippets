import React from "react";

export default function Search({ onClear }) {
  const onClick = (event) => {
    event.preventDefault();
    onClear();
  };

  return (
    <button className="btn btn-light btn-block" onClick={onClick}>
      Clear
    </button>
  );
}
