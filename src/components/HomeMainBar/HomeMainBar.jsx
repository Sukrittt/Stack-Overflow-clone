import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./HomeSideBar.css";
import { useSelector } from "react-redux";
import QuestionList from "./QuestionList";
import Warning from "../Toast/Warning/Warning";

const HomeMainBar = () => {
  const questionList = useSelector((state) => state.questionReducer); //data received from backend
  const location = useLocation(); //will get the path which is active at present

  //sorting in descending order based on the number of answers and votes.
  questionList.data &&
    questionList.data.sort((a, b) => {
      // Sort by noOfAnswers
      if (a.noOfAnswers !== b.noOfAnswers) {
        return b.noOfAnswers - a.noOfAnswers;
      }

      // If noOfAnswers are the same, sort by number of votes
      const aVotes = a.upVote.length - a.downVote.length;
      const bVotes = b.upVote.length - b.downVote.length;
      if (bVotes !== aVotes) {
        return bVotes - aVotes;
      }

      // If both properties are equal, maintain the current order
      return 0;
    });

  //search text stored in redux-store
  const search = useSelector(
    (state) => state.searchReducer.searchInput
  ).toLowerCase();

  //Will filter out the questions whose questionTitle do not match the search text
  const searchedQuestions = questionList.data
    ? questionList.data.filter((user) =>
        user.questionTitle.toLowerCase().includes(search)
      )
    : [];

  const user = useSelector((state) => state.currentUserReducer); //will get the user details from the redux store;
  const navigate = useNavigate();

  //toast visibility
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const checkAuth = () => {
    if (user === null) {
      setTimeout(() => {
        setWarning(false);
        navigate("/auth");
      }, 2500);
      setWarning(true);
      setWarningText("Login/Signup to ask a question.");
      return;
    }
    navigate("/AskQuestions");
  };
  return (
    <div className="main-bar">
      <div className="warning-div" style={{ top: "1em" }}>
        {/* Warning to be displayed for 2s */}
        {warning && <Warning type="Warning" text={warningText} />}
      </div>
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <motion.button
          className="ask-btn"
          onClick={checkAuth}
          whileTap={{ scale: 0.95 }}
        >
          Ask Question
        </motion.button>
      </div>
      <div>
        {questionList.data === null ? (
          <div className="lds-ring">
            <svg viewBox="25 25 50 50" className="loader-svg">
              <circle r="20" cy="50" cx="50" className="loader-circle"></circle>
            </svg>
          </div>
        ) : (
          <>
            <p>{searchedQuestions.length} Questions</p>
            <QuestionList questionList={searchedQuestions} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainBar;
