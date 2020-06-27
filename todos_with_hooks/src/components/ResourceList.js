import React from "react";
import useResources from "./useResources";

const ResourceList = (props) => {
  const resources = useResources(props.resource);
  return (
    <ul>
      {resources.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default ResourceList;
