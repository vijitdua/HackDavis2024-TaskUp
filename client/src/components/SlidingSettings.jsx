import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "../api/auth";
import Cookies from "universal-cookie";
import { addAFriend, removeFriend, fetchFriendList } from "../api/manageFriends";
import ErrorMessage from "./ErrorMessage";

function RightSideMenu() {
    const cookie = new Cookies();
    const [error, setErr] = useState(null);
    const [errID, setErrID] = useState(0); //Error Message component won't re-render if same error occurs, but if new error ID is sent, it knows it's a new error
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newFriend, setNewFriend] = useState('');
    const [friendsList, setFriendsList] = useState([]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    useEffect(() => {
        async function fetchFriends() {
            const friends = await fetchFriendList();
            if (friends) {
                setFriendsList(friends);
            } else {
                // Handle error fetching friends
            }
        }

        fetchFriends();
    }, []);

    async function handleAddFriend(){
        // Add friend handling logic here
        console.log("Adding friend:", newFriend);
        let success = await addAFriend(newFriend);
        if(success !== true){
            setErr(success);
            setErrID(prevId => prevId + 1); // Increment errorId to ensure a new key for each error
        }
        if(success === true) {
            // Close the dialog
            setDialogOpen(false);
            // Clear the input field
            setNewFriend('');
            // Update friends list
            const updatedFriends = await fetchFriendList();
            if (updatedFriends) {
                setFriendsList(updatedFriends);
            } else {
                // Handle error fetching updated friends list
            }
        }
    };

    async function handleRemoveFriend(username) {
        const success = await removeFriend(username);
        if (success === true) {
            // Update friends list
            const updatedFriends = friendsList.filter((friend) => friend !== username);
            setFriendsList(updatedFriends);
        } else {
            // Handle error removing friend
        }
    }

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
                    {/* Display list of friends */}
                    {friendsList.map((friend, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={friend} />
                            {friendsList.length > 0 && (
                                <Button onClick={() => handleRemoveFriend(friend)}>Remove</Button>
                            )}
                        </ListItem>
                    ))}
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
                {error && <ErrorMessage message={error} errID={errID}/>}
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddFriend}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default RightSideMenu;
