import React from "react";

const ProfileIcon = ({ email }) => {
  return (
    <div className="w-12 h-12 p-3 font-bold bg-uniGreen text-white text-lg rounded-full text-center">
      {String(email).charAt(0).toUpperCase()}
    </div>
  );
};

export default ProfileIcon;
