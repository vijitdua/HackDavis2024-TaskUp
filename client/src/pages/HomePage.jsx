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
import { fetchMyTasks, deleteTask, setTaskCompletion } from "../api/taskManagement";
import SlidingSettings from "../components/SlidingSettings";
import DeleteIcon from '@mui/icons-material/Delete';

function HomePage() {
    const [completedPercent, setCompletedPercent] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            setLoading(true);
            const tasksData = await fetchMyTasks();
            setTasks(tasksData || []);
            setLoading(false);
        }

        fetchTasks();
    }, []);

    useEffect(() => {
        calculateCompletedPercentage();
    }, [tasks]);

    async function handleTaskClick(taskId, state) {
        console.log("handleTaskClick called with taskId:", taskId, "and state:", state);
        await setTaskCompletion(taskId, state);
        console.log("Task completion updated. Refreshing tasks...");
        const updatedTasksData = await fetchMyTasks();
        setTasks(updatedTasksData || []);
    }

    async function handleDeleteTask(event, taskId){
        await deleteTask(taskId);
        console.log(taskId);
    }

    const calculateCompletedPercentage = () => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.taskFinished !== 0).length;
        setCompletedPercent(totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100);
    };

    return (
        <Box sx={{ backgroundColor: '#D8F0FF', minHeight: '100vh', pb: 7 }}>
            <CssBaseline />
            <MenuBar />
            <Box sx={{ my: 3, mx: 'auto', textAlign: 'center', color: 'gray' }}>
                <Typography variant="h4" component="h1">My Tasks</Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            You have {tasks.length} tasks!
                        </Typography>
                        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress variant="determinate" value={completedPercent} size={150} thickness={4} sx={{ color: '#81C4F8' }} />
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.secondary"
                                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                            >
                                {`${completedPercent}%`}
                            </Typography>
                        </Box>
                        <List>
                            {tasks.map(task => (
                                <React.Fragment key={task.taskID}>
                                    <ListItem
                                        button
                                        sx={{ backgroundColor: '#67C6E3', borderRadius: '10px', mb: 1 }}
                                        onClick={() => handleTaskClick(task.taskID, task.taskFinished === 0)}
                                    >
                                        <Checkbox
                                            edge="start"
                                            checked={task.taskFinished !== 0}
                                            disableRipple
                                            onChange={() => handleTaskClick(task.taskID, task.taskFinished === 0)}
                                            inputProps={{ 'aria-labelledby': String(task.taskID) }}
                                        />
                                        <ListItemText
                                            id={task.taskID}
                                            primary={task.taskName}
                                            secondary={task.deadline}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={(event) => handleDeleteTask(event, task.taskID)}
                                            >
                                                <DeleteIcon sx={{ color: 'red' }} />
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
        </Box>
    );
}

export default HomePage;
