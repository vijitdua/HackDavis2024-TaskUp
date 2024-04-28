import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {withAuthInfo, useRedirectFunctions, useLogoutFunction} from '@propelauth/react'

function RightSideMenu() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const logoutFunction = useLogoutFunction();
    const {redirectToLoginPage, redirectToSignupPage, redirectToAccountPage} = useRedirectFunctions();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            {/* Drawer icon on the right of the screen */}
            <IconButton onClick={toggleDrawer(true)} edge="end">
                <MenuIcon />
            </IconButton>

            {/* Drawer with custom background color */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: '#67C6E3', // Your specified background color
                        width: 250 // You can adjust the width or make it responsive
                    }
                }}
            >
                <List>
                    {/* Add your menu items here */}
                    <ListItem button onClick={()=> redirectToAccountPage()}>
                            Account Settings
                    </ListItem>
                    <ListItem button onClick={()=> logoutFunction(true)}>
                        Log out
                    </ListItem>
                    {/* ... more items */}
                </List>
            </Drawer>
        </Box>
    );
}

export default RightSideMenu;
