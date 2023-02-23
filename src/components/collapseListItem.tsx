import React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';

interface CollapseListItemValues {
    itemText: string;
}

const CollapseListItem: React.FC<CollapseListItemValues> = (props: CollapseListItemValues) => {
    const {itemText} = props; 
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={itemText} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Opções" />
                </ListItemButton>
                </List>
            </Collapse>
      </>
    )
}
export default CollapseListItem