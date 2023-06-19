import { Box, Divider, List, SwipeableDrawer } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";
import UserContext from "./Context";
import ListItem from "./ListItem";
import Logo from "./Logo";

interface DrawerProps {
  open: boolean;
  handleDrawerOpen: any;
  handleDrawerClose: any;
  handleLeaveClick: any;
}
const drawerWidth = 240;

export default function Drawer({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  handleLeaveClick,
}: DrawerProps) {
  const { state } = useContext(UserContext);

  return (
    <SwipeableDrawer
      anchor="right"
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      open={open}
    >
      <Box sx={{ width: drawerWidth }}>
        <List>
          <Link href={{ pathname: "/" }} onClick={handleDrawerClose}>
            <Logo />
          </Link>
          <ListItem
            itemText={"Fornecedores"}
            route="/fornecedores"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "buyer"]}
          />
          <ListItem
            itemText={"Produtos"}
            route="/produtos"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "manager"]}
          />
          <ListItem
            itemText={"Pedidos"}
            route="/pedidos"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "driver", "manager", "buyer"]}
          />
          <ListItem
            itemText={"Lojas"}
            route="/lojas"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "driver", "manager", "buyer"]}
          />
          <ListItem
            itemText={"Veículos"}
            route="/veiculos"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "driver"]}
          />
          <ListItem
            itemText={"Entregas"}
            route="/entregas"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "driver", "manager"]}
          />
          <ListItem
            itemText={"Acompanhamento"}
            route="/acompanhamento"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "driver", "manager"]}
          />
          <ListItem
            itemText={"Usuários"}
            route="/usuarios"
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin"]}
          />
        </List>
        <Divider />
        <List>
          <ListItem
            itemText={"Editar Perfil"}
            route={`configuration/edit-profile/${state?.user?.id}`}
            handleClick={handleDrawerClose}
            userRoles={state.user?.roles}
            permissions={["admin", "driver", "manager", "buyer"]}
          />
          <ListItem
            itemText={"Sair"}
            route="/login"
            handleClick={handleLeaveClick}
            userRoles={state.user?.roles}
            permissions={["admin", "driver", "manager", "buyer"]}
          />
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
