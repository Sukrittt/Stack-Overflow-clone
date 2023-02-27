import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import { maleAvatars, femaleAvatars } from "../Avatars/Avatars";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../actions/question";
import Success from "../components/Toast/Success/Success";

const DisplayAnswers = ({ question, handleShare }) => {
  const allUsers = useSelector((state) => state.userReducer);
  const user = useSelector((state) => state.currentUserReducer); //will get the user details from the redux store
  const { id } = useParams(); // will return an object
  const dispatch = useDispatch();

  //to extract the entire user details of the user who answered the question
  const filteredUser = [];

  question.answer.map((answer) => {
    const answerUser = allUsers.filter((user) => user._id === answer.userId);
    if (answerUser.length > 0) {
      filteredUser.push(answerUser[0]); // add the first matching user to the array
    }
  });
  //to filter out repeating elements in filteredUser
  //checking if the element is already present in the array
  const searchIndex = (arr, element) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === element) return i;
    }
    return -1;
  };

  const answerUser = [];
  //Iterating through every user and pushing only unique elements in the new array
  for (let i = 0; i < filteredUser.length; i++) {
    if (searchIndex(answerUser, filteredUser[i]._id) === -1) {
      answerUser.push(filteredUser[i]);
    }
  }

  //toast visibility
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");

  //to delete an answer with a particular id
  const handleDelete = (answerId, noOfAnswers) => {
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
    setSuccess(true);
    setSuccessText("Your answer was deleted.");
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };

  //gsap
  useEffect(() => {
    gsap.fromTo(
      ".display-ans",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.15,
      }
    );
  }, []);
  return (
    <div>
      <div className="warning-div" style={{ top: "-20em" }}>
        {/* Warning to be displayed for 2.5s */}
        {success && <Success type="Success" text={successText} />}
      </div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.anwerBody}</p>
          <div className="question-actions-user">
            <div className="flex" style={{ gap: "10px" }}>
              <motion.button
                type="button"
                onClick={handleShare}
                whileTap={{ scale: 0.9 }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/uvqnvwbl.json"
                  trigger="hover"
                  colors="primary:#939292"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
              </motion.button>
              {user?.result?._id === ans?.userId && (
                // If the id of the user logged in and the id of the user who posted the question matches
                <motion.button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                  whileTap={{ scale: 0.9 }}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/jmkrnisz.json"
                    trigger="hover"
                    colors="primary:#939292"
                    style={{ width: "20px", height: "20px" }}
                  ></lord-icon>
                </motion.button>
              )}
            </div>
            <div>
              <p style={{ color: "gray", fontSize: ".875em" }}>
                posted {moment(ans.answeredOn).fromNow()}
              </p>
              <Link
                to={`/user/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                {answerUser.map((user) =>
                  user._id === ans.userId ? (
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
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswers;
