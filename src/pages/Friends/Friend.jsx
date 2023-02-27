import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Friend = ({ friendId, users }) => {
  //finding the details of only user which matches the 'friendId'
  const eachFriend = users.find((friend) => friend._id === friendId);
  //gsap
  useEffect(() => {
    gsap.fromTo(
      ".user-profile-link",
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
    <Link to={`/user/${friendId}`} className="user-profile-link">
      <h3>{eachFriend?.name.charAt(0).toUpperCase()}</h3>
      <h5>{eachFriend?.name}</h5>
    </Link>
  );
};

export default Friend;
