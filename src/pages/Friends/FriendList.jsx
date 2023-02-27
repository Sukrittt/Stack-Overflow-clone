import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "../Users/users.css";
import Friend from "./Friend";
import FriendSvg from "../../assets/FriendsSVG.jsx";

const FriendList = ({ setFriends, user, friends }) => {
  const users = useSelector((state) => state.userReducer); //gets all the user details from the redux store

  //to update the number of friends user has
  useEffect(() => {
    setFriends(user?.result.friends.length);
  }, [user, setFriends]);

  return friends !== 0 ? (
    <div className="user-list-container">
      {user?.result.friends.map((element) => (
        <Friend key={element} friendId={element} users={users} />
      ))}
    </div>
  ) : (
    <>
      <p className="user-no-friends label">You have no friends - yet</p>
      <FriendSvg />
    </>
  );
};

export default FriendList;
