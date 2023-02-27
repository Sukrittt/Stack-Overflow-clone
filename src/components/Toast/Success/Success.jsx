import React from "react";
import { motion } from "framer-motion";

import "./Success.css";

const Success = ({ type, text }) => {
  return (
    <motion.div
      className="wrapper"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="toast success">
        <div className="container-2">
          <p className="label">{type}</p>
          <p>{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Success;
