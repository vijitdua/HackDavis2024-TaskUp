import React, {useEffect} from "react";
import {Box, Container, CssBaseline, Link, Typography} from "@mui/material";
import MenuBar from "../components/MenuBar";
import SlidingSettings from "../components/SlidingSettings";
import {authenticateToken} from "../api/auth";

function Leaderboard() {

    async function checkLoginStatus() {
        let status = await authenticateToken();
        if(status === false){
            window.location.href = '/';
        }
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);

    // Hardcoded list of friends
    const friends = [
        { id: 1, name: "John Doe",points: 100},
        { id: 2, name: "Jane Smith", points: 150 },
        { id: 3, name: "Alice Johnson", points: 200 },
        // Add more friends as needed
    ];

    // Sort friends based on points
    const sortedFriends = friends.slice().sort((a, b) => b.points - a.points);

    return (
        <Container maxWidth='lg' >
            <SlidingSettings/>
            <CssBaseline>

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
                    {/*<Box display="flex" alignItems="center" position="relative" justifyContent="space-evenly">
                        <Typography variant="h5" gutterBottom style={{ position: "absolute", left: "10px" }}>
                            1st
                        </Typography>
                        <Typography variant="h5" gutterBottom style={{ textAlign: "center", width: "100%" }}>
                            {sortedFriends[0].name}
                        </Typography>
                        <Typography variant="h5" gutterBottom style={{ position: "absolute", right: "10px" }}>
                            {sortedFriends[0].points} points
                        </Typography>
                    </Box>*/}
                    <Typography variant="h4" align="center" gutterBottom>
                        {sortedFriends[0].name} is in the lead!
                    </Typography>
                </Box>
            )}
                </Box>


            <Box display="flex" flexDirection="column" alignItems="center">
                {sortedFriends.map((friend, index) => (
                <React.Fragment key={friend.id}>
                    <Box key={friend.id} display="flex" alignItems="center" paddingY={2} paddingX={4} sx={{ width: "100%" }}>
                        <Typography variant="h6" gutterBottom style={{ position: "absolute", left: "60px" }}>
                            {index + 1}
                        </Typography>
                        <Typography variant="h6" gutterBottom style={{ fontSize: "4em" }}>
                            {index === 0 ? "🥇":index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐️"}
                        </Typography>
                        <Typography variant="h6" gutterBottom >
                            {friend.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom style={{ position: "absolute", right: "60px" }}>
                            {friend.points}pts
                        </Typography>

                        {/*<Box
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
                        </Box>*/}
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
