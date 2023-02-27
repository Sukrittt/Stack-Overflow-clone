import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import "./AskQuestions.css";
import { askQuestion } from "../../actions/question";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../components/SideBarContext/AuthContext";
import Warning from "../../components/Toast/Warning/Warning";

const AskQuestions = () => {
  //useState hook to store the title, body and tags
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer); // will get the details of the user logged in
  const navigate = useNavigate();
  const { screenWidth } = useContext(AuthContext); //screenWidth context

  //toast visibility
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  //to handle the data after submitting a question
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (questionTitle === "" || questionBody === "" || tags === "") {
      setTimeout(() => {
        setWarning(false);
      }, 2500);
      setWarning(true);
      setWarningText("Please give proper details for the question.");
      return;
    }
    setLoading(true);
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          tags,
          userPosted: user.result.name, // in 'user' we got a token 'result' which contains the name of the user logged in
          userId: user?.result?._id,
        },
        navigate
      )
    );
  };

  const LoaderComponent = ({ loading }) => {
    return (
      <>
        {loading ? (
          <button className="review-btn submit-comment ask-loader-btn">
            <Loading />
          </button>
        ) : (
          <motion.input
            type="submit"
            value="Review your question"
            className="review-btn"
            whileTap={{ scale: 0.95 }}
          />
        )}
      </>
    );
  };

  //to handle the event of the 'enter' key pressed in the question's body
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n"); // When 'enter' is pressed then add a '\n' to the 'questionBody' as well
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container main-question-container">
        <div className="warning-div">
          {/* Warning to be displayed for 2.5s */}
          {warning && <Warning type="Warning" text={warningText} />}
        </div>
        <h1>Ask a public Question</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="ask-form-container question-container">
            <div className="input-group">
              <label htmlFor="ask-ques-title" className="label">
                <h4 style={{ fontSize: "1.25em" }}>Title</h4>
                <p>
                  Be specific and imagine you are asking a question to another
                  person
                </p>
              </label>
              <input
                type="text"
                className="email-input"
                name="question-title"
                id="ask-ques-title"
                placeholder={`${
                  screenWidth > 900
                    ? "e.g. Is there an R function for finding the index of an element in a vector?"
                    : "e.g. What is a function?"
                }`}
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
              />
              <div></div>
            </div>
            <div className="input-group">
              <label htmlFor="ask-ques-body" className="label">
                <h4 style={{ fontSize: "1.25em" }}>Body</h4>
                <p>
                  Include all the information someone would need to answer your
                  question
                </p>
              </label>
              <textarea
                name="ask-ques-body"
                id="ask-ques-body"
                className="email-input"
                cols="30"
                rows="10"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                onKeyDown={handleEnter}
              ></textarea>
              <div></div>
            </div>
            <div className="input-group">
              <label htmlFor="ask-ques-tags" className="label">
                <h4 style={{ fontSize: "1.25em" }}>Tags</h4>
                <p>
                  Be specific and imagine you are asking a question to another
                  person
                </p>
              </label>
              <input
                type="text"
                cols="30"
                name="question-tags"
                className="email-input"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
                onChange={(e) => {
                  setTags(e.target.value.split(" "));
                }}
              />
            </div>
            <div></div>
          </div>
          <LoaderComponent loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default AskQuestions;
