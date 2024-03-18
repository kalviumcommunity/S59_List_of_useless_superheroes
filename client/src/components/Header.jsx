import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {
  const [userName, setUserName] = useState("LOGIN");
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const userNameCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("userName=")
    );

    if (userNameCookie) {
      const userNameValue = userNameCookie.split("=")[1];
      setUserName(userNameValue);
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    console.log(auth);
  }, [auth]);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-black absolute z-10 text-white bg-opacity-70 p-4 w-full">
      <div className="flex w-full items-center place-content-between ">
        <Link to={"/"}>
          <img src="logo.svg" className="h-6" alt="" />
        </Link>

        <div>
          <IconButton
            // size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <div className="flex items-center w-40">
              <AccountCircle />
              <span className="mx-2 font-bold">{userName}</span>
            </div>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
             <Link to={"/blog"}>
              <MenuItem sx={{ color: 'black', fontSize : '20px' }}>Blog</MenuItem>
            </Link>
            {auth ? (
              <Link to={"/logout"}>
                <MenuItem sx={{ color: 'red', fontSize : '20px' }}>Logout</MenuItem>
              </Link>
            ) : (
              <Link to={"/login"}>
                <MenuItem sx={{ color: 'green', fontSize :'20px' }}>Login</MenuItem>
              </Link>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
