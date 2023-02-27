import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { postComment } from "../../actions/comments";
import Loading from "../../components/Loading/Loading";
import Warning from "../../components/Toast/Warning/Warning";

const PostComment = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUserReducer); // will get the details of the user

  const [loading, setLoading] = useState(false);

  //toast visibility
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (msg === "") {
      setTimeout(() => {
        setWarning(false);
      }, 2500);
      setWarning(true);
      setWarningText("Please write something in order to post something");
      return;
    }
    setLoading(true);
    dispatch(
      postComment(
        {
          msg,
          userPosted: user.result.name,
          userId: user.result._id,
        },
        navigate
      )
    );
    document.getElementById("comment").value = "";
  };

  //shortcut ctrl + enter
  const triggerShortCut = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleOnSubmit(e);
    }
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

  //When loading
  const LoaderComponent = ({ loading }) => {
    return (
      <>
        {loading ? (
          <button className="review-btn submit-comment loader-btn">
            <Loading />
          </button>
        ) : (
          <div className="hover-div">
            <motion.span
              className="hover-text post-hover-text"
              animate={{ opacity: animate ? 1 : 0 }}
            >
              Comment (Ctrl + Enter)
            </motion.span>
            <motion.input
              type="submit"
              whileTap={{ scale: 0.95 }}
              value="Comment"
              onMouseEnter={handleShortcutPrompt}
              className="review-btn submit-comment"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="ask-question">
      <div className="warning-div">
        {/* Warning to be displayed for 2.5s */}
        {warning && <Warning type="Warning" text={warningText} />}
      </div>
      <div className="ask-ques-container main-comment-container">
        <h1>Share Your Experiences</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="ask-form-container comment-container">
            <div className="input-group">
              <textarea
                name="comment"
                className="email-input"
                id="comment"
                cols="30"
                rows="5"
                onKeyDown={(e) => {
                  triggerShortCut(e);
                }}
                placeholder="Share your thougths and ideas here..."
                onChange={(e) => setMsg(e.target.value)}
              ></textarea>
              <div></div>
            </div>
          </div>
          <LoaderComponent loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default PostComment;
