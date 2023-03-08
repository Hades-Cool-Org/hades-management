import React, { useEffect } from "react";
import { ArrowBackIos, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname.includes("configuration"));
  }, []);

  const handleClick = () => {
    router.back();
  };

  return (
    <>
      <div className="layout-header">
        {router.pathname.includes("configuration") ? (
          <IconButton onClick={handleClick}>
            <ArrowBackIos fontSize="small" style={{ fill: "white" }} />
          </IconButton>
        ) : (
          <Link href={"./configuration"}>
            <Menu fontSize="large" style={{ fill: "white" }} />
          </Link>
        )}
        <span className="title-span">Perfil - </span>
      </div>
    </>
  );
};

export default Header;
