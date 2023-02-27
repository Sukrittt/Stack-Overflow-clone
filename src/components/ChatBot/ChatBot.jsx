import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./chatBot.css";
import Avatar from "../../assets/chatbot-avatar.svg";

const ChatBot = ({ setDisplayChat, displayChat }) => {
  const [chat, setChat] = useState(false);
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState([]);

  //to enable/disable chatbot
  const handleChatClick = () => {
    setChat(!chat);
  };

  //to handle the message sent by the user to chatbot
  const handleMessage = (e) => {
    e.preventDefault();
    setMsg([...msg, message]);
    document.getElementById("text").value = "";
    // authentication(message)
  };

  return (
    <div className="main-chat-container">
      {chat ? (
        <div className="chatbox-container">
          <div className="chatbox-main-content">
            <div className="chatbox-header">
              <div className="chatbox-header-child">
                <div className="chatbox-avatar">
                  <img src={Avatar} alt="chatbot-avatar" height="50px" />
                </div>
                <div className="chatbox-details">
                  <div className="chatbox-name">Chatbot</div>
                  <div className="chatbox-status">
                    <div className="online"></div> Online Now
                  </div>
                </div>
              </div>
              <div className="chatbox-header-child">
                <FontAwesomeIcon
                  className="chatbox-cross"
                  icon={faXmark}
                  onClick={handleChatClick}
                />
              </div>
            </div>
            <div className="chatbox-body">
              <p className="chatbox-message">
                We're sorry, but the feature you're looking for is currently
                under development and will be available soon.
              </p>
              <p className="chatbox-message">
                Thank you for your patience and stay tuned for updates!
              </p>
              {msg.length > 0 ? (
                msg.map((text) => (
                  <p className="chatbox-message user" key={text}>
                    {text}
                  </p>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="chatbox-footer">
            <form onSubmit={handleMessage}>
              <input
                type="text"
                placeholder="Reply to Chatbot..."
                className="chatbox-input"
                id="text"
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      ) : (
        <>
          <FontAwesomeIcon
            className="chatbot-icon"
            icon={faComment}
            onClick={handleChatClick}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="chatbox-icon-cross"
            onClick={() => setDisplayChat(!displayChat)}
          />
        </>
      )}
    </div>
  );
};

export default ChatBot;
