import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "../api/auth";
import Cookies from "universal-cookie";

function RightSideMenu() {
    const cookie = new Cookies();

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newFriend, setNewFriend] = useState('');

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleAddFriend = () => {
        // Add friend handling logic here
        console.log("Adding friend:", newFriend);
        // Close the dialog
        setDialogOpen(false);
        // Clear the input field
        setNewFriend('');
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
                    <ListItem button onClick={() => logout()}>
                        Log out
                    </ListItem>
                    {/* Add button to open add friend dialog */}
                    <ListItem button onClick={() => setDialogOpen(true)}>
                        Add Friend
                    </ListItem>
                    {/* ... more items */}
                </List>
            </Drawer>

            {/* Dialog for adding friend */}
            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add Friend</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Friend's Username"
                        fullWidth
                        value={newFriend}
                        onChange={(e) => setNewFriend(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddFriend}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default RightSideMenu;