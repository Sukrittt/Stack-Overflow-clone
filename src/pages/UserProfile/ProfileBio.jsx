import React from "react";

const EditProfileBio = ({ currentProfile }) => {
  return (
    <div className="card">
      <div>
        {currentProfile?.about && (
          <>
            <h4 className="user-about-heading">About</h4>
            <p className="user-about label">{currentProfile?.about}</p>
          </>
        )}
      </div>
      {currentProfile?.tags.length > 0 && currentProfile?.tags[0] !== "" && (
        <div>
          <h4 className="user-about-heading">Tags Watched</h4>
          <div className="user-tag-flexbox label">
            {currentProfile?.tags.map((tag) => (
              <p key={tag} className="user-tags">
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileBio;
