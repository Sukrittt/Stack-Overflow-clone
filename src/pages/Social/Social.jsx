import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./social.css";
import Warning from "../../components/Toast/Warning/Warning";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import Comment from "./Comment";

const Social = () => {
  const user = useSelector((state) => state.currentUserReducer); // will get the details of the user

  //toast visibility
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const navigate = useNavigate();
  const handlePostComment = () => {
    if (user === null) {
      setTimeout(() => {
        setWarning(false);
        navigate("/auth");
      }, 2500);
      setWarning(true);
      setWarningText("Please Login/Signup to share comments.");
      return;
    }
    navigate("/postComment");
  };
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="main-bar" data-scroll-section>
          <div className="warning-div" style={{ top: 0 }}>
            {/* Warning to be displayed for 2s */}
            {warning && <Warning type="Warning" text={warningText} />}
          </div>
          <div className="social-header">
            <h1>Social Community</h1>
            <motion.button
              className="ask-btn"
              onClick={handlePostComment}
              whileTap={{ scale: 0.9 }}
            >
              Post a Comment
            </motion.button>
          </div>
          <div className="social-body">
            <Comment />
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Social;
