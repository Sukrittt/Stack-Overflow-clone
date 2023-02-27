import React from "react";
import { motion } from "framer-motion";

import "./Info.css";
import InfoImg from "../../../assets/info.png";

const Info = ({ type, text }) => {
  return (
    <motion.div
      className="wrapper"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="toast info">
        <div className="container-2 flex">
          <img src={InfoImg} alt="warning-img" height="25px" />
          <div>
            <p className="label">{type}</p>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Info;
