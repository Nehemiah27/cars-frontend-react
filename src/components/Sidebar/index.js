import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WebURL from "../../enum/WebURL";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      <Typography
        className="sidebar-header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "26px",
        }}
      >
        <h2>Car Management</h2>
        <HomeIcon
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(WebURL.HOME_PAGE)}
        />
      </Typography>
      <List>
        <ListItem
          button
          component={Link}
          to={WebURL.VIEW_CARS}
          className={
            isActive(WebURL.VIEW_CARS) || isActive(WebURL.HOME_PAGE)
              ? "active"
              : ""
          }
        >
          <ListItemText primary="View Cars" />
        </ListItem>
        <Divider />
        <ListItem
          button
          component={Link}
          to={WebURL.ADD_CARS}
          className={isActive(WebURL.ADD_CARS) ? "active" : ""}
        >
          <ListItemText primary="Add Cars" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
