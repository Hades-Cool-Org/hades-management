import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ListItemValues {
    itemText: string;
}

const ListItem: React.FC<ListItemValues> = (props:ListItemValues) => {
    const {itemText} = props;
    
    return(
        <ListItemButton>
            <ListItemText primary={itemText} />
            <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small"/>
            </ListItemIcon>
        </ListItemButton>
    )
}

export default ListItem;