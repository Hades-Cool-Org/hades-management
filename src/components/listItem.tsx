import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

interface ListItemValues {
  itemText: string;
  handleClick?: any;
  route?: string;
}

const ListItem: React.FC<ListItemValues> = (props: ListItemValues) => {
  const { itemText, handleClick, route } = props;

  return (
    <Link href={{ pathname: route }}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={itemText} />
      </ListItemButton>
    </Link>
  );
};

export default ListItem;
