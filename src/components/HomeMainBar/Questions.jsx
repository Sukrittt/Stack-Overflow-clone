import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { gsap } from "gsap";

import { AuthContext } from "../../components/SideBarContext/AuthContext";

const Questions = ({ question }) => {
  //gsap
  useEffect(() => {
    gsap.fromTo(
      ".display-question-container",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.15,
      }
    );
  }, []);

  //screenWidth context
  const { screenWidth } = useContext(AuthContext);

  return (
    <div className="display-question-container" data-scroll-section>
      {/* <div className={`${screenWidth < 500 && "flex mobile-display-vote"}`}> */}
      {screenWidth < 500 ? (
        <div className="flex mobile-display-vote">
          <div className="display-votes-ans">
            <p>{question.upVote.length - question.downVote.length}</p>
            <p className="label">votes</p>
          </div>
          <div className="display-votes-ans" style={{ padding: 0 }}>
            <p>{question.noOfAnswers}</p>
            <p className="label">answers</p>
          </div>
        </div>
      ) : (
        <>
          <div className="display-votes-ans">
            <p>{question.upVote.length - question.downVote.length}</p>
            <p className="label">votes</p>
          </div>
          <div className="display-votes-ans">
            <p>{question.noOfAnswers}</p>
            <p className="label">answers</p>
          </div>
        </>
      )}
      <div className="display-question-details">
        <Link to={`/questions/${question._id}`} className="question-title-link">
          {question.questionTitle}
        </Link>
        <div className="display-tags-time" style={{ marginTop: "5px" }}>
          <div className="display-tags">
            {question.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <p className="display-time" style={{ color: "gray" }}>
            {moment(question.askedOn).fromNow()} by {question.userPosted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
