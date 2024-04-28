import React,{useState, useEffect} from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import MenuBar from "../components/MenuBar";
import SlidingSettings from "../components/SlidingSettings";
import { authenticateToken } from "../api/auth";
import {fetchFriendList, fetchUserStats} from "../api/manageFriends"
function Leaderboard() {
    const [friendsStats, setFriendsStats] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await authenticateToken(); // Check login status
            const friends = await fetchFriendList(); // Fetch friend list
            if (friends) {
                const stats = await Promise.all(
                    friends.map(async (friend) => {
                        const stats = await fetchUserStats(friend);
                        if (stats && stats.numTasksDoneToday) {
                            return { username: friend, points: stats.numTasksDoneToday };
                        }
                        return { username: friend, points: 0 };
                    })
                );
                setFriendsStats(stats);
            }
        }
        fetchData();
    }, []);

    // const sortedFriends = friendsStats.slice().sort((a, b) => b.points - a.points);

    async function checkLoginStatus() {
        let status = await authenticateToken();
        if (status === false) {
            window.location.href = '/';
        }
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);

    // Hardcoded list of friends
    const friends = [
        { id: 1, name: "John Doe", points: 100 },
        { id: 2, name: "Jane Smith", points: 150 },
        { id: 3, name: "Alice Johnson", points: 200 },
        // Add more friends as needed
    ];

    // Sort friends based on points
    const sortedFriends = friends.slice().sort((a, b) => b.points - a.points);

    return (
        <Box sx={{ backgroundColor: '#D8F0FF' }}> {/* Add background color here */}
            <Container maxWidth='lg'>
                <SlidingSettings />
                <CssBaseline />
                <Box borderRadius={8} overflow="hidden">
                    {/* Section for the 1st place */}
                    {sortedFriends.length > 0 && (
                        <Box bgcolor="#81C4F8" p={2} mb={2}>
                            <Typography variant="h3" align="center" gutterBottom>
                                Leaderboard
                            </Typography>
                            <Typography variant="h5" align="center" gutterBottom style={{ fontSize: "4em" }}>
                                🏆
                            </Typography>
                            <Typography variant="h4" align="center" gutterBottom>
                                {sortedFriends[0].name} is in the lead!
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {sortedFriends.map((friend, index) => (
                        <React.Fragment key={friend.id}>
                            <Box key={friend.id} display="flex" alignItems="center" justifyContent="space-evenly" paddingY={2} paddingX={4} sx={{ width: "100%" }}>
                                <Typography variant="h6" gutterBottom >
                                    {index + 1}
                                </Typography>
                                <Typography variant="h6" gutterBottom style={{ fontSize: "4em" }}>
                                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐️"}
                                </Typography>
                                <Typography variant="h6" gutterBottom >
                                    {friend.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {friend.points}pts
                                </Typography>
                            </Box>
                            {index !== sortedFriends.length - 1 && <hr style={{ width: "80%", backgroundColor: "#E5E5E5", margin: "0 auto" }} />}
                        </React.Fragment>
                    ))}
                </Box>
            </Container>
            <MenuBar />
        </Box>
    );
}

export default Leaderboard;
