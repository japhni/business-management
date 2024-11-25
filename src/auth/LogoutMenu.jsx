import { Extension, Logout, Settings } from "@mui/icons-material";
import { Avatar, Divider, Link, ListItemIcon, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const LogoutMenu = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/login", { state: { message: " You have been logged out!" } });
  };

  return (
    <>
    <Link href="/profile" underline="none">
      <MenuItem>
        <Avatar /> Profile
      </MenuItem>
      </Link>

      <Divider />

      <Link href="/options" underline="none">
      <MenuItem>
        <ListItemIcon>
          <Extension fontSize="small" />
        </ListItemIcon>
        Options
      </MenuItem>
      </Link>

      <Divider />

      <Link href="/settings" underline="none">
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      </Link>

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  )
};

export default LogoutMenu;
