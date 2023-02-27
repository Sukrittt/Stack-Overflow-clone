//Dependencies
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import "./Navbar.css";
import logo from "../../assets/stackOverFlow_image.jpg";
import icon from "../../assets/icon.png";
import { setCurrentUser } from "../../actions/currentUser";
import { setSearchInput } from "../../actions/search";
import { SidebarContext } from "../SideBarContext/SideBarContext";
import { AuthContext } from "../SideBarContext/AuthContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let User = useSelector((state) => state.currentUserReducer); //Selects the state of currentUserReducer where the data of user is stored

  //logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); //to navigate to home page if user has logged out in any other page
    dispatch(setCurrentUser(null));
  };

  const [search, setSearch] = useState("");

  //search
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(search));
  };

  //Whenever the dispatch changes/occur it will send data to the function 'setCurrentUser'
  useEffect(() => {
    const token = User?.token; //jwt token of the user
    if (token) {
      const decodedToken = decode(token); // to decode the token
      //if current time has exceeded the expiry time then log out the user automatically
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  //to handle toggle hamburger menu
  const { isOpen, toggleSidebar } = useContext(SidebarContext);

  //screenWidth context
  const { screenWidth } = useContext(AuthContext);

  return (
    <nav className="main-nav" data-scroll-section>
      <div className="navbar">
        {screenWidth < 800 &&
          location.pathname !== "/auth" &&
          location.pathname !== "/postComment" &&
          location.pathname !== "/AskQuestions" && (
            <label htmlFor="check" className="hamburger">
              <input
                type="checkbox"
                id="check"
                checked={isOpen ? true : false}
                onClick={toggleSidebar}
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
          )}
        <Link to="/" className="nav-btn">
          <img src={logo} alt="home logo" />
          <img src={icon} alt="home-icon" height="50px" />
        </Link>
        <form
          className="form"
          onChange={handleSearch}
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="search" className="search-label">
            <input
              className="input"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              id="search"
            />
            <div className="fancy-bg"></div>
            <div className="search">
              <lord-icon
                src="https://cdn.lordicon.com/rlizirgt.json"
                trigger="hover"
                colors="primary:#3a3a3a"
                style={{
                  width: "22px",
                  height: "22px",
                  margin: "5px",
                  paddingLeft: "12px",
                }}
              ></lord-icon>
            </div>
          </label>
        </form>
        {screenWidth > 740 &&
          (User === null ? (
            <Link
              to="/auth"
              className="nav-item nav-links new-btn"
              whileTap={{ scale: 0.8 }}
            >
              Log in
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </Link>
          ) : (
            <div className="flex">
              <motion.button
                className="nav-item nav-links new-btn"
                onClick={handleLogout}
                whileTap={{ scale: 0.95 }}
                style={{ marginLeft: "10px" }}
              >
                Log out
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </motion.button>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
