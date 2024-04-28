import React from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    BottomNavigation,
    BottomNavigationAction,
    ListItemSecondaryAction
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScoreIcon from '@mui/icons-material/Score';
import CircularProgress from '@mui/material/CircularProgress';

function HomePage() {
    // You would fetch or calculate these values in a real application
    const completedPercentage = 72;
    const tasks = [
        { title: 'UX Brainstorm', time: '10:00 am -12:00 am'},
        { title: 'Finish App UI', time: '10:00 am -12:00 am'},
        { title: "Amanda at Ruth's", time: '10:00 am -12:00 am'},
    ];

    return (
        <Box sx={{ backgroundColor:'#ffff', minHeight: '100vh', pb: 7 }}>
            <Box sx={{ my: 3, mx: 2 }}>
                <Typography variant="h4" gutterBottom>
                    My Tasks
                </Typography>
                <Typography variant="h6" gutterBottom>
                    You have 20 tasks!
                </Typography>

                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress variant="determinate" value={100} size={150} thickness={4} sx={{ color: '#e0e0e0' }} />
                    <CircularProgress variant="determinate" value={completedPercentage} size={150} thickness={4} sx={{ color: '#81C4F8', position: 'absolute', top: 0, left: 0 }} />
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        {`${completedPercentage}%`}
                    </Typography>
                </Box>

                <List>
                    {tasks.map((task, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText primary={task.title} secondary={task.time} />
                                <ListItemSecondaryAction>
                                    {/*<Typography sx={{ color: getCategoryColor(task.category), fontWeight: 'bold' }}>{task.category}</Typography>*/}
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index < tasks.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Calendar" icon={<CalendarTodayIcon />} />
                    <BottomNavigationAction label="Scores" icon={<ScoreIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

// function getCategoryColor(category) {
//     switch (category) {
//         case 'Meetings':
//             return '#000000'; // Replace with actual color code
//         case 'Design':
//             return '#4CAF50'; // Replace with actual color code
//         case 'Calls':
//             return '#F44336'; // Replace with actual color code
//         default:
//             return '#000000';
//     }
// }

export default HomePage;