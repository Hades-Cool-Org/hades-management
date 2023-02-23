import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Router from "next/router";

const Header = () => {
  return (
    <>
      <div className="layout-header">
        <IconButton
          aria-label="config-button"
          onClick={() => Router.push("./configuration")}
        >
          <Menu fontSize="large" style={{ fill: "white" }} />
        </IconButton>
        <span className="title-span">Perfil - Comprador</span>
      </div>
    </>
  );
};

export default Header;
