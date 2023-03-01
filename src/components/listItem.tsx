import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ListItemValues {
    itemText: string;
    handleClick?: any;
}

const ListItem: React.FC<ListItemValues> = (props:ListItemValues) => {
    const {itemText, handleClick} = props;

    return(
        <ListItemButton onClick={handleClick}>
            <ListItemText primary={itemText} />
            <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small"/>
            </ListItemIcon>
        </ListItemButton>
    )
}

export default ListItem;