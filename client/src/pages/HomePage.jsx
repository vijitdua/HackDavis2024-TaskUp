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
        <Box sx={{ backgroundColor: '#D8F0FF', minHeight: '100vh', pb: 7 }}>
            <Box sx={{ my: 3, mx: 'auto', textAlign: 'center', color: 'white' }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Kodchasan, sans-serif' }}>
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
                            <CircularProgress variant="determinate" value={completedPercentage} size={150} thickness={4} sx={{ color: '#67C6E3' }} />
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
                                    <ListItem
                                        button
                                        onClick={() => handleTaskClick(task.taskID)}
                                        sx={{ backgroundColor: '#67C6E3', borderRadius: '10px', mb: 1 }}
                                    >
                                    <Checkbox
                                        edge="start"
                                        checked={completedTasks.includes(task.taskID)}
                                        disableRipple
                                        sx={{
                                            color: 'white',
                                            '&.Mui-checked': {
                                                color: 'white',
                                            },
                                            '&.Mui-checked:hover': {
                                                backgroundColor: 'white',
                                            },
                                        }}
                                    />
                                        <ListItemText primary={task.taskName} secondary={task.deadline} sx={{ color: 'white' }} />
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
