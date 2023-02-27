import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { motion } from "framer-motion";

import "./UserProfile.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import { maleAvatars, femaleAvatars } from "../../Avatars/Avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import {
  addFriendRequest,
  deleteFriend,
  getUpdatedUser,
} from "../../actions/users";
import Success from "../../components/Toast/Success/Success";
import Warning from "../../components/Toast/Warning/Warning";
import Info from "../../components/Toast/Info/Info";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.userReducer);

  //will filter out all other other id except the one that matches the url's id
  // the profile which is clicked and select the 1st element as there will only be 1 element
  const currentProfile = users.filter((user) => user._id === id)[0]; // the profile which is clicked
  const currentUser = useSelector((state) => state.currentUserReducer); // the profile which is logged in

  const [editswitch, setEditSwitch] = useState(false); //edit profile useState

  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile")); //updated user

  const avatars =
    currentProfile?.gender === "Male" ? maleAvatars : femaleAvatars; //contains the avatars depending on user's gender

  //for checking if the visited profile user is already a friend of the user who is logged in
  const index = updatedUser?.result.friends.findIndex(
    (id) => id === currentProfile?._id
  );

  //toast visibility
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");

  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const [info, setInfo] = useState(false);
  const [infoText, setInfoText] = useState("");

  //handle add friend request
  const handleAddFriendRequest = () => {
    if (currentUser === null) {
      setTimeout(() => {
        setWarning(false);
        navigate("/auth");
      }, 2500);
      setWarning(true);
      setWarningText("Login/Signup to ask a question.");
      return;
    }

    dispatch(addFriendRequest(currentUser?.result._id, id))
      .then((errorStatus) => {
        if (errorStatus === 201) {
          setTimeout(() => {
            setWarning(false);
          }, 2500);
          setWarning(true);
          setWarningText("Your friend request is still pending.");
          return;
        }
        setTimeout(() => {
          setInfo(false);
        }, 2500);
        setInfo(true);
        setInfoText(`Friend Request Sent to ${currentProfile.name}`);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    dispatch(getUpdatedUser(currentUser?.result._id));
  };

  //handle delete friend
  const handleDeleteFriend = () => {
    dispatch(deleteFriend(currentUser?.result._id, id));
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
    setSuccess(true);
    setSuccessText("Friend removed successfully.");
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getUpdatedUser(currentUser?.result._id));
    }
  }, []);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="warning-div" style={{ top: "5em" }}>
          {/* Warning to be displayed for 2.5s */}
          {success && <Success type="Success" text={successText} />}
        </div>
        <div className="warning-div" style={{ top: "5em" }}>
          {/* Warning to be displayed for 2s */}
          {warning && <Warning type="Warning" text={warningText} />}
        </div>
        <div className="warning-div" style={{ top: "5em" }}>
          {/* Warning to be displayed for 2.5s */}
          {info && <Info type="Info" text={infoText} />}
        </div>
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <img
                src={avatars[currentProfile?.avatarIndex]}
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                }}
                height="180px"
                alt=""
              />
              <div className="user-name">
                <h1 style={{ marginBottom: "0" }}>{currentProfile?.name}</h1>
                <p className="label" style={{ marginTop: "10px" }}>
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    style={{ marginRight: "2px" }}
                  />{" "}
                  Joined {moment(currentProfile?.joinedOn).fromNow()}
                </p>
                {currentProfile?._id !== currentUser?.result?._id ? (
                  index < 0 || !currentUser ? (
                    <motion.button
                      className="user-add-friend"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddFriendRequest}
                    >
                      Add Friend
                    </motion.button>
                  ) : (
                    <motion.button
                      className="user-add-friend"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDeleteFriend}
                    >
                      Remove Friend
                    </motion.button>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/*Edit profile button will be available only when the currentUser's id matches the id which is in the url */}
            {/*CurrentUser is the user which is being displayed on the page*/}
            {currentUser?.result._id === id && (
              <motion.button
                type="button"
                onClick={() => setEditSwitch(true)}
                className="edit-profile-btn cta"
                whileTap={{ scale: 0.95 }}
              >
                <span className="hover-underline-animation">Edit Profile</span>
                <svg
                  viewBox="0 0 46 16"
                  height="10"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  id="arrow-horizontal"
                >
                  <path
                    transform="translate(30)"
                    d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                    data-name="Path 10"
                    id="Path_10"
                  ></path>
                </svg>
              </motion.button>
            )}
          </div>
          <>
            {editswitch ? (
              <EditProfileForm
                currentUser={currentUser}
                setEditswitch={setEditSwitch}
              /> //Only the user logged in can edit the profile
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
