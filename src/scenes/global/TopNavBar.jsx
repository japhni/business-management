import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { ContentCut } from "@mui/icons-material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Logout from "@mui/icons-material/Logout";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import LogoutMenu from "../../auth/LogoutMenu";
import { ColorModeContext } from "../../theme";

function TopNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const { user } = useContext(AuthContext);
  // const isLoggedIn = user !== null;
  // console.log(user)

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

 

  return (
    <AppBar position="static" color="info">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <ContentCut sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {isLoggedIn && userRole.includes("ROLE_ADMIN") && (
                <span>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/dashboard" underline="none">
                      <Typography sx={{ textAlign: "center" }}>
                        Dashboard
                      </Typography>
                    </Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/new-customer" underline="none">
                      <Typography sx={{ textAlign: "center"}}>
                        Nouveau Client
                      </Typography>
                    </Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/new-employee" underline="none">
                      <Typography sx={{ textAlign: "center" }}>
                        Nouveau Employee
                      </Typography>
                    </Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/customers" underline="none">
                      <Typography sx={{ textAlign: "center" }}>
                        Liste des Clients
                      </Typography>
                    </Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/employees" underline="none">
                      <Typography sx={{ textAlign: "center"}}>
                        Liste des Employees
                      </Typography>
                    </Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/invoices" underline="none">
                      <Typography sx={{ textAlign: "center"}}>
                        Les revenus
                      </Typography>
                    </Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/form" underline="none">
                      <Typography sx={{ textAlign: "center"}}>
                        Les depenses
                      </Typography>
                    </Link>
                  </MenuItem>
                </span>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
          <ContentCut sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/dashboard" underline="none">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
            </Link>
          </Box>

          {/** from others source */}

          <Box display="flex" justifyContent={"flex-end"} p={2}>
            {/* ICONS */}
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {isLoggedIn ? (
              <LogoutMenu />
            ) : (
              <Link href="/login" underline="none" color="white">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Login
                </MenuItem>
              </Link>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNavBar;
