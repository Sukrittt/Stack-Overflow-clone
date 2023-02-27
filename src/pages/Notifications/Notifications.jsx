import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./notifications.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import Info from "../../components/Toast/Info/Info";
import UserNotification from "./UserNotification";
import { markAsRead, getUpdatedUser } from "../../actions/users";

const Notifications = () => {
  const currentUser = useSelector((state) => state.currentUserReducer); // the profile which is logged in

  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile"));

  useEffect(() => {
    if (currentUser) {
      dispatch(getUpdatedUser(currentUser?.result._id));
    }
  }, [currentUser]);

  const dispatch = useDispatch();

  //toast visibility
  const [info, setInfo] = useState(false);
  const [infoText, setInfoText] = useState("");

  //to clear all notifications
  const handleMarkAsRead = () => {
    const msgRead = [];
    updatedUser?.result.notifications.map((message) => {
      msgRead.push(message._id);
    });
    dispatch(markAsRead(updatedUser?.result._id, msgRead));
    setTimeout(() => {
      setInfo(false);
    }, 2500);
    setInfo(true);
    setInfoText("All messages marked as read.");
  };

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="main-bar">
          <div className="warning-div" style={{ top: 0 }}>
            {/* Warning to be displayed for 2.5s */}
            {info && <Info type="Info" text={infoText} />}
          </div>
          <div className="notification-header flex">
            <h1 style={{ fontWeight: 400 }}>Notifications</h1>
            {updatedUser?.result.notifications.length > 0 && (
              <button className="mark-as-read" onClick={handleMarkAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          {updatedUser?.result.notifications.length === 0 ? (
            <p className="user-no-friends label">No notifications - yet</p>
          ) : (
            updatedUser?.result.notifications
              .reverse()
              .map((user) => <UserNotification key={user._id} user={user} />)
          )}
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Notifications;
