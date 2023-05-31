import React from "react";
import { ArrowBackIos, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Drawer from "./Drawer";

const Header = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLeaveClick = () => {
    Cookie.remove("user");
    Cookie.remove("state");
    setOpen(false);
  };

  return (
    <>
      <header className="layout-header">
        <IconButton onClick={handleBackClick}>
          <ArrowBackIos fontSize="small" style={{ fill: "white" }} />
        </IconButton>
        <IconButton onClick={handleDrawerOpen}>
          <Menu fontSize="large" style={{ fill: "white" }} />
        </IconButton>
        <Drawer
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleLeaveClick={handleLeaveClick}
        />
      </header>
    </>
  );
};

export default Header;
