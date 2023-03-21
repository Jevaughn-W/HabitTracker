import * as React from "react";
import {IconButton, Menu,MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function AppBarMenuButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const logout = useLogout();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const navAboutUs = () => {
    navigate("/about");
  };

  const navHabitInfo = () => {
    navigate("/habit-info");
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu-button"
        sx={{ mr: 2 }}
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        <MenuItem onClick={navHabitInfo}>Why Track Habits?</MenuItem>
        <MenuItem onClick={navAboutUs}>About us</MenuItem>
      </Menu>
    </div>
  );
}
