import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import copy from "copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import "./Questions.css";
import DisplayAnswers from "./DisplayAnswers";
import { deleteQuestion, postAnswer, voteQuestion } from "../actions/question";
import { maleAvatars, femaleAvatars } from "../Avatars/Avatars";

import Warning from "../components/Toast/Warning/Warning";
import Success from "../components/Toast/Success/Success";

const QuestionDetails = () => {
  const { id } = useParams(); // will return the id from the url
  const [Answer, setAnswer] = useState(""); //will store the answer

  const user = useSelector((state) => state.currentUserReducer); //will get the user details from the redux store
  const questionList = useSelector((state) => state.questionReducer); //will get the questions from the redux store
  const navigate = useNavigate(); // to navigate to other url
  const location = useLocation(); // to get the current url
  const dispatch = useDispatch(); // to dispatch information in redux-store

  //toast visibility
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");

  const allUsers = useSelector((state) => state.userReducer);

  //to extract the entire user details of the user who asked the question
  const questionUser = [];
  questionList.data &&
    questionList.data.forEach((question) => {
      const users = allUsers.filter((user) => user._id === question.userId);
      if (users.length > 0) {
        questionUser.push(users[0]); // assuming there's only one matching user
      }
    });

  //contains the avatars depending on user's gender
  const avatarQuestion =
    questionUser[0]?.gender === "Male" ? maleAvatars : femaleAvatars;

  //shortcut ctrl + enter
  const triggerShortCut = (e, answerLength) => {
    if (e.ctrlKey && e.key === "Enter") {
      handlePostAnswer(e, answerLength);
    }
  };

  //to post the answer and send the data to the databse and redux store
  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    if (user === null) {
      setTimeout(() => {
        setWarning(false);
        navigate("/Auth"); //if user is not logged in then redirect to login/signup page
      }, 2500);
      setWarning(true);
      setWarningText("Login/Signup to answer a question.");
    } else {
      if (Answer === "") {
        setTimeout(() => {
          setWarning(false);
        }, 2500);
        setWarning(true);
        setWarningText("Please write something in order to post something.");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1, // +1 because we are adding a new answer
            anwerBody: Answer,
            userAnswered: user.result.name,
            userId: user.result._id,
          })
        );
        document.getElementById("answer-body").value = "";
        setAnswer("");
      }
    }
  };
  const URL = "https://sukrit-stackoverflow-clone.netlify.app";
  //to copy the url for share functionality
  const handleShare = () => {
    copy(URL + location.pathname); // will concat home url with the path and copy it to clipboard
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
    setSuccess(true);
    setSuccessText("Link copied successfully.");
  };

  // to delete the question
  const handleDelete = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
    setSuccess(true);
    setSuccessText("Your question was deleted.");
    dispatch(deleteQuestion(id, navigate));
  };

  //to handle up vote
  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", user.result._id));
  };

  //to handle down vote
  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", user.result._id));
  };

  const [animate, setAnimate] = useState(false);
  //to handle the styles of text on hover
  const handleShortcutPrompt = () => {
    setTimeout(() => {
      setTimeout(() => {
        setAnimate(false);
      }, 2000);
      setAnimate(true);
    }, 500);
  };

  return (
    <div className="question-details-page" data-scroll-section>
      {questionList.data === null ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div className="warning-div" style={{ top: 0 }}>
            {/* Warning to be displayed for 2s */}
            {warning && <Warning type="Warning" text={warningText} />}
          </div>
          <div className="warning-div" style={{ top: 0 }}>
            {/* Warning to be displayed for 2.5s */}
            {success && <Success type="Success" text={successText} />}
          </div>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <lord-icon
                        src="https://cdn.lordicon.com/xdakhdsq.json"
                        trigger="click"
                        colors="primary:#121331"
                        onClick={handleUpVote}
                        state="hover-1"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                      <p style={{ margin: ".25em 0" }}>
                        {question.upVote.length - question.downVote.length}
                      </p>
                      <lord-icon
                        src="https://cdn.lordicon.com/albqovim.json"
                        trigger="click"
                        onClick={handleDownVote}
                        colors="primary:#121331"
                        state="hover-1"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.tags.map((tags) => (
                          <p key={tags}>{tags}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div className="flex" style={{ gap: "10px" }}>
                          <button type="button" onClick={handleShare}>
                            <lord-icon
                              src="https://cdn.lordicon.com/uvqnvwbl.json"
                              trigger="hover"
                              colors="primary:#939292"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </button>
                          {user?.result?._id === question?.userId && (
                            // If the id of the user logged in and the id of the user who posted the question matches
                            <button type="button" onClick={handleDelete}>
                              <lord-icon
                                src="https://cdn.lordicon.com/jmkrnisz.json"
                                trigger="hover"
                                colors="primary:#939292"
                                style={{ width: "20px", height: "20px" }}
                              ></lord-icon>
                            </button>
                          )}
                        </div>
                        <div>
                          <p style={{ color: "gray", fontSize: ".875em" }}>
                            asked {moment(question.askedOn).fromNow()}
                          </p>
                          <Link
                            to={`/user/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <img
                              className="avatar-image"
                              src={avatarQuestion[questionUser[0]?.avatarIndex]}
                              height="35px"
                              alt=""
                            />
                            <motion.div whileTap={{ scale: 0.9 }}>
                              {question.userPosted}
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswers
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length);
                    }}
                  >
                    {!(question.userId === user?.result._id) && (
                      <>
                        <div className="input-group">
                          <label htmlFor="comment-title" className="label">
                            <h4 style={{ fontSize: "1.5em", color: "black" }}>
                              Your Answer
                            </h4>
                          </label>
                          <textarea
                            id="answer-body"
                            className="email-input"
                            cols="30"
                            rows="10"
                            onKeyDown={(e) => {
                              triggerShortCut(e, question.answer.length);
                            }}
                            placeholder="Add a comment..."
                            onChange={(e) => setAnswer(e.target.value)}
                          ></textarea>
                          <div></div>
                        </div>
                        <br />
                        <div className="hover-div">
                          <motion.span
                            className="hover-text"
                            animate={{ opacity: animate ? 1 : 0 }}
                          >
                            Post (Ctrl + Enter)
                          </motion.span>
                          <motion.input
                            type="submit"
                            value="Post Your Answer"
                            onMouseEnter={handleShortcutPrompt}
                            className="post-ans-btn"
                            whileTap={{ scale: 0.9 }}
                          />
                        </div>
                      </>
                    )}
                  </form>
                  <p style={{ fontSize: ".95em" }}>
                    Not the answer you're looking for? Browse other Question
                    tagged
                    {question.tags.map((tag) => (
                      <Link key={tag} to="/tags" className="ans-tags">
                        {" " + tag + " "}
                      </Link>
                    ))}{" "}
                    or{" "}
                    <Link
                      to="/AskQuestions"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
