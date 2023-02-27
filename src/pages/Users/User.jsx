import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import "./users.css";

const User = ({ user }) => {
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
    <Link to={`/user/${user._id}`} className="user-profile-link">
      <h3>{user.name.charAt(0).toUpperCase()}</h3>
      <h5>{user.name}</h5>
    </Link>
  );
};

export default User;
