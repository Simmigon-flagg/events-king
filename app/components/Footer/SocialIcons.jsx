"use client";
import React from "react";

import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaSquareGithub,
  FaLinkedin,
  FaSquareInstagram,
} from "react-icons/fa6";

const icons = [
  { name: <FaSquareFacebook />, link: "#" },
  { name: <FaSquareXTwitter />, link: "#" },
  { name: <FaSquareGithub />, link: "#" },
  { name: <FaLinkedin />, link: "#" },
  { name: <FaSquareInstagram />, link: "#" },
];

const SocialIcons = () => {
  return (
    <div className="text-teal-500">
      {icons.map((icon, index) => (
        <a
          key={index}
          href={icon.link}
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
          {icon.name}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
