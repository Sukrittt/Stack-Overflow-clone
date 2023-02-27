import React from "react";

import "./RightSideBar.css";
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";

const RightSideBar = () => {
  return (
    <aside className="rightside-bar">
      <Widget />
      <WidgetTags />
    </aside>
  );
};

export default RightSideBar;
