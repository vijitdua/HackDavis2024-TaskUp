import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
    Checkbox,
} from '@mui/material';
import MenuBar from "../components/MenuBar";
import { fetchMyTasks } from "../api/taskManagement";

function HomePage() {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await fetchMyTasks();
            if (tasksData) {
                setTasks(tasksData);
                setLoading(false);
            } else {
                // Handle error fetching tasks
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleTaskClick = (taskId) => {
        if (completedTasks.includes(taskId)) {
            setCompletedTasks(completedTasks.filter(id => id !== taskId));
        } else {
            setCompletedTasks([...completedTasks, taskId]);
        }
    };

    const completedPercentage = Math.round((completedTasks.length / tasks.length) * 100);

    return (
        <Box sx={{ backgroundColor: '#DFF5FF', minHeight: '100vh', pb: 7 }}>
            <Box sx={{ my: 3, mx: 'auto', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    My Tasks
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
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
                                <React.Fragment key={task.taskID}>
                                    <ListItem button onClick={() => handleTaskClick(task.taskID)}>
                                        <Checkbox
                                            edge="start"
                                            checked={completedTasks.includes(task.taskID)}
                                            disableRipple
                                        />
                                        <ListItemText primary={task.taskName} secondary={task.deadline} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </>
                )}
            </Box>

            <MenuBar />
        </Box>
    );
}

export default HomePage;
