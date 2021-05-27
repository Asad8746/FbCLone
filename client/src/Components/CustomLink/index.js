import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const CustomLink = ({ to, render }) => {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });
  const active = match
    ? {
        borderBottomWidth: 3,
        borderBottomColor: "#1877f2",
        borderBottomStyle: "solid",
      }
    : {};
  return (
    <Link
      to={to}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...active,
      }}
    >
      {render(match)}
    </Link>
  );
};

export default CustomLink;
