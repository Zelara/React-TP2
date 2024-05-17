import React from "react";
import jseImage from "/admin/jse-3.png";
import "./Comic.scss";
import Aime from "./Aime";

function Comic() {
  return (
    <div className="Comic">
      <p>date</p>
      <div>
        <img className="comic" src={jseImage} alt="JSE 3" />
        <Aime />
      </div>
    </div>
  );
}

export default Comic;
