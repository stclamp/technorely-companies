import "./Header.css";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <div className="header__logo">
            <Link to="/" className="header__logo-link">
              Technorely
            </Link>
          </div>
          <div className="header__links">
            <Link className="header__link" to="/signin">
              Sign In
            </Link>
            <Link className="header__link" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
