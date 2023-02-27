import React, { useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import "./LeftSideBar.css";
import { getUpdatedUser } from "../../actions/users";
import GroupUsers from "../../assets/groupUser.png";
import Question from "../../assets/question.png";
import Tags from "../../assets/Tags.png";
import Social from "../../assets/Social.png";
import Friend from "../../assets/Friend.png";
import LogIn from "../../assets/log-in.png";
import Logout from "../../assets/log-out.png";
import { SidebarContext } from "../SideBarContext/SideBarContext";
import { AuthContext } from "../SideBarContext/AuthContext";
import { setCurrentUser } from "../../actions/currentUser";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUserReducer); // the profile which is logged in

  useEffect(() => {
    if (currentUser) {
      dispatch(getUpdatedUser(currentUser?.result._id));
    }
  }, [currentUser]);

  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile"));

  //extracting the variable from useContect set from Navbar
  const { isOpen, toggleSidebar } = useContext(SidebarContext);
  const { screenWidth } = useContext(AuthContext);

  //to remove leftside bar if any other link is clicked
  //if leftsidebar is open then toggle it
  const handleToggleHamburg = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  //to close the leftside bar when user presses 'esc'
  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      handleToggleHamburg();
    }
  });

  //logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); //to navigate to home page if user has logged out in any other page
    dispatch(setCurrentUser(null));
  };

  return (
    <div
      className={`left-sidebar ${isOpen && "sidebar-open"}`}
      id="left-sidebar"
    >
      <nav className="side-nav">
        <NavLink
          to="/"
          className="side-nav-links"
          activeclassname="active"
          onClick={handleToggleHamburg}
        >
          <lord-icon
            src="https://cdn.lordicon.com/slduhdil.json"
            trigger="hover"
            colors="primary:#3a3a3a"
            style={{ width: "25px", height: "25px", margin: "10px" }}
          ></lord-icon>
          <p>Home</p>
        </NavLink>
        {currentUser && (
          <NavLink
            to="/notifications"
            className="side-nav-links"
            activeclassname="active"
            onClick={handleToggleHamburg}
          >
            <div className="notification">
              <lord-icon
                className="lord-icon"
                src="https://cdn.lordicon.com/msetysan.json"
                trigger="hover"
                colors="primary:#3a3a3a"
                state="hover"
                style={{ width: "25px", height: "25px", margin: "10px" }}
              ></lord-icon>
              {/* If the user is logged in and has at least one notification */}
              {currentUser && updatedUser?.result.newMsg > 0 && (
                <span className="notification-count">
                  <sup>{updatedUser?.result.newMsg}</sup>
                </span>
              )}
            </div>
            <p>Notifications</p>
          </NavLink>
        )}
        <NavLink
          to="/about"
          className="side-nav-links"
          onClick={handleToggleHamburg}
          activeclassname="active"
        >
          <lord-icon
            src="https://cdn.lordicon.com/ogkplaef.json"
            trigger="hover"
            colors="primary:#3a3a3a"
            state="hover"
            style={{ width: "25px", height: "25px", margin: "10px" }}
          ></lord-icon>
          <p>About</p>
        </NavLink>
        {currentUser && (
          <NavLink
            to={`/user/${currentUser?.result._id}`}
            className="side-nav-links"
            activeclassname="active"
            onClick={handleToggleHamburg}
          >
            <lord-icon
              src="https://cdn.lordicon.com/hbvyhtse.json"
              trigger="hover"
              colors="primary:#3a3a3a"
              style={{ width: "25px", height: "25px", margin: "10px" }}
            ></lord-icon>
            <p>Profile</p>
          </NavLink>
        )}
        <div className="side-nav-div">
          <NavLink
            to="/questions"
            className="side-nav-links"
            onClick={handleToggleHamburg}
            activeclassname="active"
          >
            <img
              src={Question}
              alt="question-icon"
              height="20px"
              style={{ margin: "10px" }}
            />
            <p>Questions</p>
          </NavLink>
          <NavLink
            to="/social"
            className="side-nav-links"
            onClick={handleToggleHamburg}
            activeclassname="active"
          >
            <img
              src={Social}
              alt="question-icon"
              height="20px"
              style={{ margin: "10px" }}
            />
            <p>Social</p>
          </NavLink>
          <NavLink
            to="/tags"
            className="side-nav-links"
            onClick={handleToggleHamburg}
            activeclassname="active"
          >
            <img
              src={Tags}
              alt="group-icon"
              height="20px"
              style={{ margin: "10px" }}
            />
            <p>Tags</p>
          </NavLink>
          <NavLink
            to="/user/"
            className="side-nav-links"
            onClick={handleToggleHamburg}
            activeclassname="active"
          >
            <img
              src={GroupUsers}
              alt="group-icon"
              height="20px"
              style={{ margin: "10px" }}
            />
            <p>Users</p>
          </NavLink>
          {currentUser && (
            <NavLink
              to="/friends"
              onClick={handleToggleHamburg}
              className="side-nav-links"
              activeclassname="active"
            >
              <img
                src={Friend}
                alt="question-icon"
                height="20px"
                style={{ margin: "10px" }}
              />
              <p>Friends</p>
            </NavLink>
          )}
          {screenWidth <= 740 &&
            (currentUser === null ? (
              <NavLink
                to="/auth"
                className="side-nav-links"
                whileTap={{ scale: 0.8 }}
              >
                <img
                  src={LogIn}
                  alt="question-icon"
                  height="20px"
                  style={{ margin: "10px" }}
                />
                <p>Log in</p>
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </NavLink>
            ) : (
              <motion.button
                className="side-nav-links"
                onClick={handleLogout}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "none",
                  border: "none",
                }}
              >
                <img
                  src={Logout}
                  alt="question-icon"
                  height="20px"
                  style={{ margin: "10px" }}
                />
                <p>Log out</p>
              </motion.button>
            ))}
        </div>
      </nav>
    </div>
  );
};

export default LeftSideBar;
