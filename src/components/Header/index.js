import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";
import { Typography } from "@mui/material";

const Header = ({ pageTitle, toggleSidebar }) => {
  return (
    <Typography className="header" sx={{ height: "26px" }}>
      <MenuIcon className="menu-icon" onClick={toggleSidebar} />
      <h1>{pageTitle}</h1>
    </Typography>
  );
};

export default Header;
