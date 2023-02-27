import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FriendList from "./FriendList";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import { getUpdatedUser } from "../../actions/users";

const Friends = () => {
  const [friends, setFriends] = useState(0);
  const dispatch = useDispatch();
  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile"));
  const currentUser = useSelector((state) => state.currentUserReducer); // the profile which is logged in

  //retrieval of data will occur after this page is mounted
  useEffect(() => {
    if (currentUser?.result._id) {
      dispatch(getUpdatedUser(currentUser?.result._id));
    }
  }, []);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2 social-container user-div">
        <h1 style={{ fontWeight: 400 }}>Friends</h1>
        <FriendList
          setFriends={setFriends}
          user={updatedUser}
          friends={friends}
        />
      </div>
    </div>
  );
};

export default Friends;
