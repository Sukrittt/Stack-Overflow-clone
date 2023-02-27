import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./users.css";
import User from "./User";
import { fetchAllUsers } from "../../actions/users";

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const users = useSelector((state) => state.userReducer);

  //search text stored in redux-store
  const search = useSelector(
    (state) => state.searchReducer.searchInput
  ).toLowerCase();

  //Will filter out the tags whose user name do not match the search text
  const searchedUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search)
  );

  return (
    <div className="user-list-container">
      {searchedUsers.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UserList;
