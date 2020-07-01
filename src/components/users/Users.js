import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";

export default function Users(props) {
  const renderContent = () => {
    if (props.loading) {
      return <Spinner></Spinner>;
    } else {
      return (
        <div style={userStyle}>
          {props.users.map((user) => (
            <UserItem key={user.id} user={user}></UserItem>
          ))}
        </div>
      );
    }
  };

  return <>{renderContent()}</>;
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
