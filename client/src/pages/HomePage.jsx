import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Checkbox,
    ListItemSecondaryAction
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MenuBar from "../components/MenuBar";

function HomePage() {
    const [completedTasks, setCompletedTasks] = useState([]);
    const tasks = [
        { id: 1, title: 'UX Brainstorm', time: '10:00 am - 12:00 am'},
        { id: 2, title: 'Finish App UI', time: '10:00 am - 12:00 am'},
        { id: 3, title: "Amanda at Ruth's", time: '10:00 am - 12:00 am'},
    ];

    const handleTaskClick = (taskId) => {
        if (completedTasks.includes(taskId)) {
            setCompletedTasks(completedTasks.filter(id => id !== taskId));
        } else {
            setCompletedTasks([...completedTasks, taskId]);
        }
    };

    const completedPercentage = Math.round((completedTasks.length / tasks.length) * 100);

    return (
        <Box sx={{ backgroundColor:'#ffff', minHeight: '100vh', pb: 7 }}>
            <Box sx={{ my: 3, mx: 2 }}>
                <Typography variant="h4" gutterBottom>
                    My Tasks
                </Typography>
                <Typography variant="h6" gutterBottom>
                    You have {tasks.length} tasks!
                </Typography>

                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress variant="determinate" value={completedPercentage} size={150} thickness={4} sx={{ color: '#81C4F8' }} />
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
                    {tasks.map((task) => (
                        <React.Fragment key={task.id}>
                            <ListItem button onClick={() => handleTaskClick(task.id)}>
                                <Checkbox
                                    edge="start"
                                    checked={completedTasks.includes(task.id)}
                                    disableRipple
                                />
                                <ListItemText primary={task.title} secondary={task.time} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            <MenuBar/>
        </Box>
    );
}

export default HomePage;
