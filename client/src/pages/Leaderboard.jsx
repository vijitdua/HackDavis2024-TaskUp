import React from "react";
import {Box, Container, CssBaseline, Link, Typography} from "@mui/material";
import MenuBar from "../components/MenuBar";
import SlidingSettings from "../components/SlidingSettings";

function Leaderboard() {
    // Hardcoded list of friends
    const friends = [
        { id: 1, name: "John Doe", profileImage: "https://example.com/profile1.jpg", points: 100},
        { id: 2, name: "Jane Smith", profileImage: "https://example.com/profile2.jpg", points: 150 },
        { id: 3, name: "Alice Johnson", profileImage: "https://example.com/profile3.jpg", points: 200 },
        // Add more friends as needed
    ];

    // Sort friends based on points
    const sortedFriends = friends.slice().sort((a, b) => b.points - a.points);

    return (
        <Container maxWidth='lg'>
            <SlidingSettings/>
            <CssBaseline>

            {/* Section for the 1st place */}
            {sortedFriends.length > 0 && (
                <Box bgcolor="#81C4F8" p={2} mb={2}>
                    <Typography variant="h3" align="center" gutterBottom>
                        Leaderboard
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-evenly">
                        <Typography variant="h5" gutterBottom>
                            1st
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {sortedFriends[0].name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {sortedFriends[0].points} points
                        </Typography>
                    </Box>
                </Box>
            )}

            <Box display="flex" flexDirection="column" alignItems="center">
                {sortedFriends.map((friend, index) => (
                    <React.Fragment key={friend.id}>
                    <Box key={friend.id} display="flex" alignItems="center" justifyContent="space-evenly" paddingY={2}>
                        <Typography variant="h6" gutterBottom>
                            {index + 1}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {friend.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {friend.points} points
                        </Typography>

                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="50%"
                            width={80}
                            height={80}
                            bgcolor="#ccc"
                            marginRight={2}
                        >
                            <img src={friend.profileImage} alt={friend.name} style={{ borderRadius: "50%", width: "100%" }} />
                        </Box>
                        {/*<Typography variant="h5" gutterBottom>*/}
                        {/*    {index === 0 ? "👑 " : ""}{friend.name}*/}
                        {/*</Typography>*/}
                    </Box>
                        {index !== sortedFriends.length - 1 && <hr style={{ width: "80%", backgroundColor: "#E5E5E5", margin: "0 auto" }} />}
                    </React.Fragment>
                ))}
            </Box>
            </CssBaseline>
            <MenuBar/>
        </Container>
    );
}

export default Leaderboard;
