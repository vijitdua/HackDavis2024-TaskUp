import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "../api/auth";
import Cookies from "universal-cookie";
import { addAFriend, removeFriend, fetchFriendList, fetchUserStats } from "../api/manageFriends"; // Import API functions
import ErrorMessage from "./ErrorMessage";

function RightSideMenu() {
    const cookie = new Cookies();
    const [error, setErr] = useState(null);
    const [errID, setErrID] = useState(0);
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
            setErrID(prevId => prevId + 1);
        }
        if(success === true) {
            setDialogOpen(false);
            setNewFriend('');
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
            const updatedFriends = friendsList.filter((friend) => friend !== username);
            setFriendsList(updatedFriends);
        } else {
            // Handle error removing friend
        }
    }

    async function computeFriendPoints() {
        const friendStats = await Promise.all(friendsList.map(async (friend) => {
            const stats = await fetchUserStats(friend);
            if (stats && stats.numTasksDoneToday) {
                return { username: friend, points: stats.numTasksDoneToday };
            }
            return { username: friend, points: 0 };
        }));

        friendStats.sort((a, b) => b.points - a.points);

        console.log("Friend Stats:", friendStats);
        // Update leaderboard state or display
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <IconButton onClick={toggleDrawer(true)} edge="end">
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: '#67C6E3',
                        width: 250
                    }
                }}
            >
                <List>
                    <ListItem button onClick={() => logout()}>
                        Log out
                    </ListItem>
                    <ListItem button onClick={() => setDialogOpen(true)}>
                        Add Friend
                    </ListItem>
                    {friendsList.map((friend, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={friend} />
                            <Button onClick={() => handleRemoveFriend(friend)}>Remove</Button>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

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
