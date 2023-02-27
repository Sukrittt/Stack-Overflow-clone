import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  acceptFriendRequest,
  declineFriendRequest,
  sendNotifyType,
  getUpdatedUser,
} from "../../actions/users";

const UserNotification = ({ user }) => {
  const currentUser = useSelector((state) => state.currentUserReducer); // the profile which is logged in
  useEffect(() => {
    if (currentUser) {
      dispatch(getUpdatedUser(currentUser?.result._id));
    }
  }, [currentUser]);

  const users = useSelector((state) => state.userReducer);
  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile"));
  const dispatch = useDispatch();

  //Getting all users from the store and extracting the user whose notification is to be showed
  const notifyUser = users.filter((id) => id._id === user.userId)[0];

  //handle accept friend request
  const handleAcceptFriend = (sentTo) => {
    dispatch(acceptFriendRequest(updatedUser?.result._id, sentTo));
    //send notification to the user stating that friend request has been accepted
    dispatch(sendNotifyType(updatedUser?.result._id, sentTo, "ACCEPT"));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  //handle decline friend request
  const handleDeclineFriend = (sentTo) => {
    dispatch(declineFriendRequest(updatedUser?.result._id, sentTo));
    //send notification to the user stating that friend request has been declined
    dispatch(sendNotifyType(updatedUser?.result._id, sentTo, "DECLINE"));
    dispatch(getUpdatedUser(updatedUser?.result._id));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  //gsap
  useEffect(() => {
    gsap.fromTo(
      ".notification-container",
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
    <>
      <div className="notification-container">
        <div>
          {user?.type === "SENT" ? (
            <p>
              You have sent a friend request to
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
            </p>
          ) : user?.type === "RECEIVED" ? (
            <p>
              You have received a friend request from
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
            </p>
          ) : user?.type === "ACCEPT" ? (
            <p>
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
              has accepted your friend request
            </p>
          ) : user?.type === "DECLINE" ? (
            <p>
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
              has declined your friend request
            </p>
          ) : user?.type === "decline" ? (
            <p>
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
              has {user?.type}d your comment.
            </p>
          ) : user?.type === "ANSWERED" ? (
            <p>
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
              has answered your
              <Link
                to={`/questions/${user.otherId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                question.
              </Link>
            </p>
          ) : user?.type === "like" ? (
            <p>
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
              has liked your comment.
            </p>
          ) : (
            <p>
              <Link
                to={`/user/${user.userId}`}
                style={{ textDecoration: "none", color: "#0086d8" }}
                className="notification-user"
              >
                {notifyUser?.name}
              </Link>
              has diliked your comment.
            </p>
          )}

          <p
            className="user-notify-time"
            style={{ fontSize: ".8em", color: "#05060f99" }}
          >
            {moment(user?.time).fromNow()}
          </p>
        </div>
        {user?.type === "RECEIVED" && (
          <div className="friend-request-handle">
            <motion.div whileTap={{ scale: 0.9 }}>
              <lord-icon
                src="https://cdn.lordicon.com/jfhbogmw.json"
                trigger="click"
                colors="primary:#d9534f"
                state="hover-3"
                onClick={() => {
                  handleDeclineFriend(user.userId);
                }}
                style={{ width: "38px", height: "38px", margin: "10px" }}
              ></lord-icon>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <lord-icon
                src="https://cdn.lordicon.com/yqzmiobz.json"
                trigger="click"
                colors="primary:#5cb85c"
                state="hover"
                onClick={() => {
                  handleAcceptFriend(user.userId);
                }}
                style={{ width: "38px", height: "38px", margin: "10px" }}
              ></lord-icon>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserNotification;
