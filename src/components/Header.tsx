import React from "react";
import { ArrowBackIos, Menu } from "@mui/icons-material";
import {
  Box,
  Divider,
  Icon,
  IconButton,
  List,
  styled,
  SvgIcon,
  SwipeableDrawer,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import ListItem from "./ListItem";
import Logo from "./Logo";
// @ts-ignore
import cookieCutter from "cookie-cutter";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  const drawerWidth = 240;

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="layout-header">
        <IconButton onClick={handleClick}>
          <ArrowBackIos fontSize="small" style={{ fill: "white" }} />
        </IconButton>
        <IconButton onClick={handleDrawerOpen}>
          <Menu fontSize="large" style={{ fill: "white" }} />
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          open={open}
        >
          <Box sx={{ width: drawerWidth }}>
            <List>
              <Logo />
              <ListItem
                itemText={"Carregadores"}
                route="/"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Fornecedores"}
                route="/fornecedores"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Produtos"}
                route="/produtos"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Pedidos"}
                route="/pedidos"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Lojas"}
                route="/"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Veículos"}
                route="/"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Entregas"}
                route="/"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Estoque"}
                route="/"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Acompanhamento"}
                route="/"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Ocorrências"}
                route="/"
                handleClick={handleDrawerClose}
              />
              <ListItem
                itemText={"Usuários"}
                route="/"
                handleClick={handleDrawerClose}
              />
            </List>
            <Divider />
            <List>
              <ListItem itemText={"Editar Perfil"} />
              <ListItem
                itemText={"Sair"}
                route="/login"
                handleClick={() => {
                  cookieCutter.set("user", undefined);
                  setOpen(false);
                }}
              />
            </List>
          </Box>
        </SwipeableDrawer>
      </header>
    </>
  );
};

export default Header;
