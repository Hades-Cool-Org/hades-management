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
              <ListItem itemText={"Pedidos"} route="/" />
              <ListItem itemText={"Lojas"} route="/" />
              <ListItem itemText={"Veículos"} route="/" />
              <ListItem itemText={"Entregas"} route="/" />
              <ListItem itemText={"Estoque"} route="/" />
              <ListItem itemText={"Acompanhamento"} route="/" />
              <ListItem itemText={"Ocorrências"} route="/" />
              <ListItem itemText={"Usuários"} route="/" />
            </List>
            <Divider />
            <List>
              <ListItem itemText={"Editar Perfil"} />
              <ListItem itemText={"Sair"} />
            </List>
          </Box>
        </SwipeableDrawer>
      </header>
    </>
  );
};

export default Header;
