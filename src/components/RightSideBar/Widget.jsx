import React from "react";

// assets
import Pen from "../../assets/pen.svg";
import Comment from "../../assets/comment.svg";
import StackIcon from "../../assets/stackOverFlow.svg";

const Widget = () => {
  return (
    <div className="widget">
      <h4>The Overflow Blog</h4>
      <div className="rightside-bar-div-1">
        <div className="rightside-bar-div-2">
          <img src={Pen} alt="pen" height="15px" />
          <p>
            Observability is key to the future of software (and your DevOps
            career)
          </p>
        </div>
        <div className="rightside-bar-div-2">
          <img src={Pen} alt="pen" height="15px" />
          <p>Podcast 374: How valuable is your screen name?</p>
        </div>
      </div>
      <h4>Featured on Meta</h4>
      <div className="rightside-bar-div-1">
        <div className="rightside-bar-div-2">
          <img src={Comment} alt="pen" height="15px" />
          <p>Review queue workflows - Final release....</p>
        </div>
        <div className="rightside-bar-div-2">
          <img src={Comment} alt="pen" height="15px" />
          <p>
            Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
          </p>
        </div>
        <div className="rightside-bar-div-2">
          <img src={StackIcon} alt="pen" height="15px" />
          <p>
            Outdated Answers: accepted answer is now unpinned on Stack Overflow
          </p>
        </div>
      </div>
      <h4>Hot Meta Posts</h4>
      <div className="rightside-bar-div-1">
        <div className="rightside-bar-div-2">
          <p>38</p>
          <p>
            Why was this spam flag declined, yet the question marked as spam?
          </p>
        </div>
        <div className="rightside-bar-div-2">
          <p>20</p>
          <p>
            What is the best course of action when a user has hiqh enouqh rep
            to...
          </p>
        </div>
        <div className="rightside-bar-div-2">
          <p>14</p>
          <p>Is a link to the "How to ask" help page a useful comment?</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
