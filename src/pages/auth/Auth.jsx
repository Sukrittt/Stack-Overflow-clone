import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import "./auth.css";
import Warning from "../../components/Toast/Warning/Warning";
import Alert from "../../components/Toast/Alert/Alert";
import Loading from "../../components/Loading/Loading";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { maleAvatars, femaleAvatars } from "../../Avatars/Avatars";

const Auth = () => {
  // If isSignUp is true then it means user is in Sign Up page
  const [isSignUp, setIsSignUp] = useState(false);

  //useState hook to set the name, email, password and gender in it.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(-1);

  //toast visibility
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  //loading
  const [loading, setLoading] = useState(false);

  //flag
  const [flag, setFlag] = useState(false); //if true then don't send data to backend
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch(); // To send an action to the redux store
  const navigate = useNavigate(); // To navigate to another page

  //to toggle password visibility
  const [toggleState, setToggleState] = useState(false);
  const toggleVisibility = () => {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      setToggleState(true);
    } else {
      passwordField.type = "password";
      setToggleState(false);
    }
  };

  //to check if a password contains atleast 8 characters including 1 character and 1 number
  const isValidText = (text) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(text);
  };
  //to generate a random index
  const randomIndex = (n) => Math.floor(Math.random() * n);

  const handleSubmit = (e) => {
    e.preventDefault(); //To prevent the default state of submitting a form which is page refresh and url change
    setFlag(false);
    if (!email && !password) {
      //Insufficient Details
      setTimeout(() => {
        setWarning(false);
      }, 2500);
      setWarning(true);
      setWarningText("Please enter your email address and password.");
      setFlag(true);
    } else if (!email) {
      setTimeout(() => {
        setWarning(false);
      }, 2500);
      setWarning(true);
      setWarningText("Please enter your email address.");
      setFlag(true);
    } else if (!password) {
      setTimeout(() => {
        setWarning(false);
      }, 2500);
      setWarning(true);
      setWarningText("Please enter your password.");
      setFlag(true);
    }
    if (isSignUp) {
      setCounter((prevCounter) => prevCounter + 1);
      if (!name) {
        setTimeout(() => {
          setWarning(false);
        }, 2500);
        setWarning(true);
        setWarningText("Please enter your name.");
        setFlag(true);
        setLoading(true);
      }
      if (!isValidText(password)) {
        setTimeout(() => {
          setWarning(false);
        }, 2500);
        setWarning(true);
        setWarningText(
          "Passwords must contain at least eight characters including atleast 1 letter and 1 number."
        );
        setFlag(true);
      }
    } else {
      // sends data to the actions and stores it in the redux store
      dispatch(login({ email, password }, navigate))
        .then((errorStatus) => {
          setLoading(false);
          if (errorStatus === 400) {
            setTimeout(() => {
              setAlert(false);
            }, 2500);
            setAlert(true);
            setAlertText("Your password is incorrect.");
          } else if (errorStatus === 404) {
            setTimeout(() => {
              setWarning(false);
            }, 2500);
            setWarning(true);
            setWarningText("Email not found. Please Sign Up.");
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      setLoading(true);
    }
  };

  //to set a random index for the avatar
  useEffect(() => {
    if (gender === "Male") {
      setAvatarIndex(randomIndex(maleAvatars.length));
    } else {
      setAvatarIndex(randomIndex(femaleAvatars.length));
    }
  }, [gender]);

  // Whenever flag and counter changes, this code will run.
  // to get immediate response from useState variables we are using useEffect to see the changes.
  useEffect(() => {
    if (flag || counter <= 0) {
      setLoading(false);
      return;
    }
    if (counter > 0) {
      setLoading(true);
      // sends data to the actions and stores it in the redux store
      dispatch(signup({ name, email, password, avatarIndex, gender }, navigate))
        .then((errorStatus) => {
          setLoading(false);
          if (errorStatus === 409) {
            setTimeout(() => {
              setWarning(false);
            }, 2500);
            setWarning(true);
            setWarningText(
              "Email is already registered with us. Please Log In."
            );
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [flag, counter]);

  return (
    <section className="auth-section">
      {isSignUp && <AboutAuth />}
      {isSignUp && (
        <>
          <div className="warning-div" style={{ top: "-15em" }}>
            {/* Warning to be displayed for 2.5s */}
            {alert && <Alert type="Alert" text={alertText} />}
          </div>
          <div className="warning-div" style={{ top: "-15em" }}>
            {/* Warning to be displayed for 2.5s */}
            {warning && <Warning type="Warning" text={warningText} />}
          </div>
        </>
      )}
      <div className="auth-container-2">
        {!isSignUp && (
          <>
            <div className="warning-div" style={{ top: "-4em" }}>
              {/* Warning to be displayed for 2.5s */}
              {alert && <Alert type="Alert" text={alertText} />}
            </div>
            <div className="warning-div" style={{ top: "-4em" }}>
              {/* Warning to be displayed for 2.5s */}
              {warning && <Warning type="Warning" text={warningText} />}
            </div>
          </>
        )}
        {!isSignUp && (
          <img src={icon} className="login-logo" alt="stack-overflow-icon" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="name" className="label">
                Display Name
              </label>
              <input
                type="text"
                className="email-input"
                required
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div></div>
            </div>
          )}
          <div className="input-group" style={{ marginTop: "1em" }}>
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              className="email-input"
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div></div>
          </div>
          <div
            className="input-group"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="password-div">
              <input
                className="email-input"
                type="password"
                name="password"
                required
                autoComplete="off"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {toggleState ? (
                <FontAwesomeIcon
                  className="password-eye"
                  icon={faEyeSlash}
                  onClick={toggleVisibility}
                />
              ) : (
                <FontAwesomeIcon
                  className="password-eye"
                  icon={faEye}
                  onClick={toggleVisibility}
                />
              )}
            </div>
            <div></div>
          </div>
          {isSignUp && (
            <p className="label" style={{ fontSize: ".85em", marginTop: 0 }}>
              Passwords must contain at least eight characters <br />
              including atleast 1 letter and 1 number.
            </p>
          )}
          {isSignUp && (
            <>
              <label
                htmlFor="gender"
                className="label"
                style={{ marginTop: "1em" }}
              >
                Gender
              </label>
              <div className="auth-gender flex">
                <label for="f-option" className="l-radio">
                  <input
                    type="radio"
                    id="f-option"
                    name="selector"
                    required
                    tabindex="1"
                    onClick={() => setGender("Male")}
                  />
                  <span className="label">Male</span>
                </label>
                <label for="s-option" className="l-radio">
                  <input
                    type="radio"
                    id="s-option"
                    name="selector"
                    required
                    tabindex="2"
                    onClick={() => setGender("Female")}
                  />
                  <span className="label">Female</span>
                </label>
              </div>
            </>
          )}
          <motion.button
            type="submit"
            className="auth-btn"
            whileTap={{ scale: 0.95 }}
            whileHover={{
              boxShadow: "0px 29px 25px -4px rgba(150, 150, 150, 0.24)",
            }}
          >
            {loading ? <Loading /> : isSignUp ? "Sign Up" : "Log In"}
          </motion.button>
        </form>
        <p className="label">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handleSwitch"
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? "Log in" : "Sign Up"}
          </button>
          {isSignUp && (
            <p style={{ color: "#666767", fontSize: "14px" }}>
              By clicking "Sign up", you agree to our{" "}
              <span style={{ color: "#007ac6" }}>
                terms of <br />
                service
              </span>
              , <span style={{ color: "#007ac6" }}>privacy policy</span> and
              <span style={{ color: "#007ac6" }}> cookie policy</span>
            </p>
          )}
        </p>
      </div>
    </section>
  );
};

export default Auth;
