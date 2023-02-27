import React from "react";
import { motion } from "framer-motion";

import "./Alert.css";
import AlertImg from "../../../assets/alert.png";

const Alert = ({ type, text }) => {
  return (
    <motion.div
      className="wrapper"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="toast error">
        <div className="container-2 flex">
          <img src={AlertImg} alt="warning-img" height="25px" />
          <div>
            <p className="label">{type}</p>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
