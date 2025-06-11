import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemText,
  IconButton, Divider, Toolbar, Typography, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            モンスター管理
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="モンスター一覧" />
          </ListItem>
          <ListItem button component={Link} to="/create">
            <ListItemText primary="新規作成" />
          </ListItem>
          <ListItem button component={Link} to="/battle">
            <ListItemText primary="対戦モード" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ position: 'fixed', top: 16, left: open ? drawerWidth + 16 : 16 }}>
        <IconButton onClick={toggleDrawer} color="primary">
          <MenuIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default Sidebar;
