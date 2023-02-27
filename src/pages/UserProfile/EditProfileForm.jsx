import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import {
  getUpdatedUser,
  updateAvatar,
  updateProfile,
} from "../../actions/users";
import { maleAvatars, femaleAvatars } from "../../Avatars/Avatars";

const EditProfileForm = ({ currentUser, setEditswitch }) => {
  const dispatch = useDispatch();
  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile")); //updated user

  const [name, setName] = useState(updatedUser?.result?.name); //the default name will be the name entered at the time of signup
  const [about, setAbout] = useState(updatedUser?.result?.about); //Will store the about text and send this to the backend server
  const [tags, setTags] = useState(updatedUser?.result?.tags.join(" ")); //default as the string version of the 'tags' in the user details
  const [avatarIndex, setAvatarIndex] = useState(
    updatedUser?.result.avatarIndex
  ); //default index of the user's avatar

  //display of avatars according to user's gender
  const avatars =
    updatedUser?.result.gender === "Male" ? maleAvatars : femaleAvatars;

  //to update the user details
  useEffect(() => {
    dispatch(getUpdatedUser(currentUser?.result._id));
  }, [updatedUser]);

  //updated userProfile submit
  const handleSubmit = (e) => {
    setTags(tags.split(" "));
    //using a different variable as tag state will not be updated immediately because of it's asynchronous nature
    const newTags = tags.split(" ");

    dispatch(
      updateProfile(currentUser?.result?._id, {
        name,
        about,
        newTags,
        avatarIndex,
      })
    );
    setEditswitch(false); //revert back to display profile page
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name" className="label">
            <h3>Display name</h3>
          </label>
          <input
            type="text"
            className="email-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div></div>
        </div>
        <div className="input-group" style={{ marginTop: "1em" }}>
          <label htmlFor="about" className="label">
            <h3>About me</h3>
          </label>
          <textarea
            id="about"
            className="email-input"
            style={{ height: "2%" }}
            cols="30"
            rows="8"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <div></div>
        </div>
        <div className="input-group" style={{ marginTop: "1em" }}>
          <label htmlFor="avatar" className="label">
            <h3>Avatars</h3>
            <div className="avatar-container email-input">
              {avatars.map((avatar) => (
                <motion.img
                  className={`${
                    avatarIndex === avatars.indexOf(avatar)
                      ? "active-avatar"
                      : ""
                  }`}
                  src={avatar}
                  alt=""
                  height="120px"
                  whileTap={{ scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "4px 47px 24px -9px rgba(150, 150, 150, 0.24)",
                  }}
                  key={avatars.indexOf(avatar)}
                  onClick={() => setAvatarIndex(avatars.indexOf(avatar))}
                />
              ))}
            </div>
          </label>
        </div>
        <div className="input-group" style={{ marginTop: "1em" }}>
          <label htmlFor="tags" className="label">
            <h3>Watched Tags</h3>
            <p>Add Tags separated by a space</p>
          </label>
          <input
            type="text"
            className="email-input"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div></div>
        </div>
        <br />
        <motion.input
          whileTap={{ scale: 0.9 }}
          type="submit"
          value="Save Profile"
          className="user-submit-btn"
        />
        <motion.button
          type="button"
          className="user-cancel-btn"
          whileTap={{ scale: 0.9 }}
          onClick={() => setEditswitch(false)}
        >
          Cancel
        </motion.button>
      </form>
    </div>
  );
};

export default EditProfileForm;
