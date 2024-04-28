import {useState} from "react";
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

function TaskPagePopUp() {
    const [taskData, setTaskData] = useState(null);

    function setData(dataType, data) {
        setTaskData({...taskData, [dataType]: data});
    }

    return (
        <CssBaseline>
            <Container maxWidth='xs'>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '16px',
                        padding: '10px',

                        '& > *': {
                            margin: '15px', // Apply margin to each child
                        },
                    }}
                >
                    <Typography variant='h2' component='h1'>Task Scheduler</Typography>

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
                        // onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </CssBaseline>
    );
}

export default TaskPagePopUp;