import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

import "./navigation.css";
import "../../styles/typography.css";
import "../../styles/color.css";

const Navigation = () => {
  const auth = useSelector((state) => state.state.auth);
  return (
    <div className="nav-master">
      <div className="nav-container justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <Link to="/" className="link">
            <div className="nav-item-left textMain h2">YPost</div>
          </Link>
          <Link to="/" className="link">
            <div className="nav-item-left body textMain">home</div>
          </Link>
          <a href="mailto:kevin.zhang@yale.edu" target="_blank">
            <div className="nav-item-left body textMain">contact</div>
          </a>
        </div>
        {auth === 1 ? (
          <Link to="/me" className="link">
            <div className="d-flex flex-row align-items-center textMain">
              <FiUser size={25} />
            </div>
          </Link>
        ) : (
          <Link to="/login" className="link">
            <div className="body textMain">Login</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
