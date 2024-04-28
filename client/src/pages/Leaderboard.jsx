import React from "react";
import { Box, Container, CssBaseline, Link, Typography } from "@mui/material";

function Leaderboard() {
    // Hardcoded list of friends
    const friends = [
        { id: 1, name: "John Doe", profileImage: "https://example.com/profile1.jpg" },
        { id: 2, name: "Jane Smith", profileImage: "https://example.com/profile2.jpg" },
        { id: 3, name: "Alice Johnson", profileImage: "https://example.com/profile3.jpg" },
        // Add more friends as needed
    ];

    return (
        <Container>
            <CssBaseline />
            <Typography variant="h3" align="center" gutterBottom>
                Leaderboard
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
                {friends.map((friend, index) => (
                    <Box key={friend.id} display="flex" alignItems="center" justifyContent="center">
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
                        <Typography variant="h5" gutterBottom>
                            {index === 0 ? "👑 " : ""}{friend.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default Leaderboard;
