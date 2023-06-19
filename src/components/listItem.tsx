import { Role } from "@/types/types";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

interface ListItemValues {
  itemText: string;
  handleClick?: any;
  route?: string;
  userRoles: Role[] | undefined;
  permissions: string[];
}

const ListItem: React.FC<ListItemValues> = ({
  itemText,
  handleClick,
  route,
  userRoles,
  permissions,
}: ListItemValues) => {
  if (!permissions.some((role: any) => userRoles?.includes(role))) {
    return <></>;
  } else {
    return (
      <Link href={{ pathname: route }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={itemText} />
        </ListItemButton>
      </Link>
    );
  }
};

export default ListItem;
