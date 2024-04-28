import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Checkbox,
    IconButton,
    CssBaseline,
} from '@mui/material';
import MenuBar from "../components/MenuBar";
import { fetchMyTasks, deleteTask } from "../api/taskManagement";
import SlidingSettings from "../components/SlidingSettings";
import DeleteIcon from '@mui/icons-material/Delete';

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

    const handleDeleteTask = async (taskId) => {
        const success = await deleteTask(taskId);
        if (success === true) {
            setTasks(tasks.filter(task => task.taskID !== taskId));
        } else {
            // Handle error deleting task
            console.error("Error deleting task");
        }
    };



    const completedPercentage = tasks.length === 0 ? 0 : Math.round((completedTasks.length / tasks.length) * 100);

    return (
        <Box sx={{ backgroundColor: '#D8F0FF', minHeight: '100vh', pb: 7 }}>
            <SlidingSettings />
            <CssBaseline />
            <Box sx={{ my: 3, mx: 'auto', textAlign: 'center', color: 'gray' }}>
                <Typography variant="h4" component="h1">
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
                                                    color: 'gray',
                                                },
                                                '&.Mui-checked:hover': {
                                                    backgroundColor: 'gray',
                                                },
                                            }}
                                        />
                                        <ListItemText primary={task.taskName} secondary={task.deadline} sx={{ color: 'white' }} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.taskID)}>
                                                <DeleteIcon sx={{ color: 'red' }} /> {/* Setting the color of DeleteIcon to red */}
                                            </IconButton>
                                        </ListItemSecondaryAction>
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
