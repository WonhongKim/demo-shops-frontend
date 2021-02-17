import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logoimage from "../images/logo_demoshop.png";

export const Header: React.FC = () => {
  return (
    <>
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={logoimage} className="w-44" alt="Demo shop" />
          </Link>
          <span className="text-xs">
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
