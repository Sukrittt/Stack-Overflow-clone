import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { voteComment } from "../../actions/comments";
import { AuthContext } from "../../components/SideBarContext/AuthContext";
import { maleAvatars, femaleAvatars } from "../../Avatars/Avatars";
import Warning from "../../components/Toast/Warning/Warning";
import Info from "../../components/Toast/Info/Info";

const Comment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commentList = useSelector((state) => state.commentReducer);
  const user = useSelector((state) => state.currentUserReducer); //will get the user details from the redux store
  const allUsers = useSelector((state) => state.userReducer);

  //to extract the entire user details of the user who asked the question
  const commentUser = [];
  commentList.data &&
    commentList.data.forEach((question) => {
      const users = allUsers.filter((user) => user._id === question.userId);
      if (users.length > 0) {
        commentUser.push(users[0]); // assuming there's only one matching user
      }
    });

  //to filter out repeating elements in commentUser
  //checking if the element is already present in the array
  const searchIndex = (arr, element) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === element) return i;
    }
    return -1;
  };
  const answerUser = [];
  //Iterating through every user and pushing only unique elements in the new array
  for (let i = 0; i < commentUser.length; i++) {
    if (searchIndex(answerUser, commentUser[i]._id) === -1) {
      answerUser.push(commentUser[i]);
    }
  }

  //toast visibility
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const [info, setInfo] = useState(false);
  const [infoText, setInfoText] = useState("");

  //handle likes and dislikes
  const handleThumbsDown = (commentId, userId) => {
    if (user === null) {
      setTimeout(() => {
        setWarning(false);
        navigate("/auth");
      }, 2500);
      setWarning(true);
      setWarningText("Please Login/Signup to like or dislike.");
      return;
    }
    if (userId === user?.result._id) {
      setTimeout(() => {
        setInfo(false);
      }, 2500);
      setInfo(true);
      setInfoText("You cannot like/dislike your own comment.");
      return;
    }
    dispatch(voteComment("dislike", user.result._id, commentId));
  };
  const handleThumbsUp = (commentId, userId) => {
    if (user === null) {
      setTimeout(() => {
        setWarning(false);
        navigate("/auth");
      }, 2500);
      setWarning(true);
      setWarningText("Please Login/Signup to like or dislike.");
      return;
    }
    if (userId === user?.result._id) {
      setTimeout(() => {
        setInfo(false);
      }, 2500);
      setInfo(true);
      setInfoText("You cannot like/dislike your own comment.");
      return;
    }
    dispatch(voteComment("like", user.result._id, commentId));
  };

  //search text stored in redux-store
  const search = useSelector(
    (state) => state.searchReducer.searchInput
  ).toLowerCase();
  //Will filter out the tags whose userPosted do not match the search text
  const searchedUsers = commentList.data
    ? commentList.data.filter((user) =>
        user.userPosted.toLowerCase().includes(search)
      )
    : [];

  //extracting the variable from useContect set from Navbar
  const { screenWidth } = useContext(AuthContext);

  return (
    <div data-scroll-section>
      <div className="warning-div" style={{ top: "-4.5em" }}>
        {/* Warning to be displayed for 2s */}
        {warning && <Warning type="Warning" text={warningText} />}
      </div>
      <div className="warning-div" style={{ top: "-4.5em" }}>
        {/* Warning to be displayed for 2.5s */}
        {info && <Info type="Info" text={infoText} />}
      </div>
      {commentList.data === null ? (
        <div className="lds-ring">
          <svg viewBox="25 25 50 50" className="loader-svg">
            <circle r="20" cy="50" cx="50" className="loader-circle"></circle>
          </svg>
        </div>
      ) : (
        searchedUsers.map((userComment) => (
          <div
            className="social-comment"
            key={userComment._id}
            style={screenWidth > 600 ? { alignItems: "center" } : null}
          >
            <div>
              <div className="comment-structure">
                <p className="social-msg">{userComment.msg}</p>
              </div>
              {screenWidth > 600 && (
                <div className="social-like">
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      onClick={() => {
                        handleThumbsDown(userComment._id, userComment.userId);
                      }}
                    />
                    <p>{userComment.noOfDislikes.length}</p>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      onClick={() => {
                        handleThumbsUp(userComment._id, userComment.userId);
                      }}
                    />
                    <p>{userComment.noOfLikes.length}</p>
                  </motion.div>
                </div>
              )}
            </div>
            <div className={screenWidth <= 600 && "flex mobile-social-design"}>
              <div className="social-message-user">
                <motion.p
                  className="social-user-posted"
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to={`/user/${userComment.userId}`}
                    className="user-link social-user-link"
                    style={{ color: "#0086d8" }}
                  >
                    {answerUser.map((user) =>
                      user._id === userComment.userId ? (
                        user.gender === "Male" ? (
                          <img
                            className="avatar-image"
                            src={maleAvatars[user?.avatarIndex]}
                            height="35px"
                            key={user._id}
                            alt=""
                          />
                        ) : (
                          <img
                            className="avatar-image"
                            src={femaleAvatars[user?.avatarIndex]}
                            height="35px"
                            key={user._id}
                            alt=""
                          />
                        )
                      ) : (
                        <></>
                      )
                    )}
                    <p>{userComment.userPosted}</p>
                  </Link>
                </motion.p>
                <p className="social-user-postedOn">
                  posted {moment(userComment.postedOn).fromNow()}
                </p>
              </div>
              {screenWidth <= 600 && (
                <div className="social-like">
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      style={{ color: "rgb(24, 24, 24)" }}
                      onClick={() => {
                        handleThumbsDown(userComment._id, userComment.userId);
                      }}
                    />
                    <p>{userComment.noOfDislikes.length}</p>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "rgb(24, 24, 24)" }}
                      onClick={() => {
                        handleThumbsUp(userComment._id, userComment.userId);
                      }}
                    />
                    <p>{userComment.noOfLikes.length}</p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;
