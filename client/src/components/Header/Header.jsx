import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "assets/images/technorely.png";
import "./Header.css";

function Header({ handleLogout }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            className="header__logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: "40px", marginRight: "10px" }}
            />
            <Typography variant="h6" noWrap>
              Technorely
            </Typography>
          </Link>
          {user.isAuth ? (
            <>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.firstName}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/account");
                    }}
                  >
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/");
                    }}
                  >
                    <Typography textAlign="center">Companies</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      handleLogout();
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <MenuItem>
                <Typography textAlign="center">
                  <Link className="header__link" to="/signin">
                    Sign In
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">
                  <Link className="header__link" to="/signup">
                    Sign Up
                  </Link>
                </Typography>
              </MenuItem>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
