import React from "react";
import Posts from "../../Components/Posts";
import "./index.style.scss";

const Home = () => {
  return (
    <div className="home">
      <Posts getHome />
    </div>
  );
};

export default Home;
