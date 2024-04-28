import {useEffect, useState} from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Box,
    Typography, ListItemSecondaryAction, Container, CssBaseline,
} from "@mui/material";
import MenuBar from "../components/MenuBar";
import {authenticateToken} from "../api/auth";
import {createTask} from "../api/taskManagement";
import ErrorMessage from "../components/ErrorMessage";

function TaskPagePopUp() {
    const [error, setErr] = useState(null);
    const [errID, setErrID] = useState(0); //Error Message component won't re-render if same error occurs, but if new error ID is sent, it knows it's a new error
    const [taskData, setTaskData] = useState(null);

    async function checkLoginStatus() {
        let status = await authenticateToken();
        if(status === false){
            window.location.href = '/';
        }
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);

    function setData(dataType, data) {
        setTaskData({...taskData, [dataType]: data});
    }

    async function addTaskButton() {
        let success = await createTask(taskData);
        if (success !== true) {
            setErr(success);
            setErrID(prevId => prevId + 1); // Increment errorId to ensure a new key for each error
            return;
        }
        if(success === true){
            window.location.href = '/'; //TODO: fix this lol
        }
    }

    return (
        <Box sx={{ backgroundColor: '#D8F0FF', minHeight: '100vh', pb: 7 }}>
        <CssBaseline>
            <Container maxWidth='xs'>
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // backgroundColor: '#f9f9f9',
                        borderRadius: '16px',
                        padding: '30px',

                        '& > *': {
                            margin: '15px', // Apply margin to each child
                        },
                    }}
                >
                    <Typography variant='h2' component='h1' style={{ fontFamily: 'Trebuchet MS', color: '#2E5077'}}>
                        Task
                    </Typography>
                    <Typography variant='h2' component='h1' style={{ fontFamily: 'Trebuchet MS', color: '#2E5077'}}>
                        Scheduler
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        label="Task Name"
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={(event) => setData("name", event.target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            label="Priority"
                            onChange={(e) => setData("priority", e.target.value)}
                        >
                            <MenuItem value="3">High</MenuItem>
                            <MenuItem value="2">Medium</MenuItem>
                            <MenuItem value="1">Low</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        required
                        label="Description"
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={(event) => setData("description", event.target.value)}/>
                    <TextField
                        fullWidth
                        id="deadline"
                        label="Deadline"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(event) => setData("deadline", event.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="one"
                        onClick={addTaskButton}
                    >
                        Submit
                    </Button>
                </Box>
                {error && <ErrorMessage message={error} errID={errID}/>}
            </Container>
            <MenuBar/>
        </CssBaseline>
        </Box>
    );
}

export default TaskPagePopUp;