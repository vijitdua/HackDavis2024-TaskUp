import React from 'react';
import {AppBar, Toolbar, IconButton, Box, SvgIcon} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import TaskPagePopUp from "../pages/TaskPagePopUp";

function MenuBar() {
    return (
        <AppBar position="fixed" sx={{top: 'auto', bottom: 0, backgroundColor: '#67C6E3'}}>
            <Toolbar>
                <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    {/* Left icon */}
                    <IconButton
                        color="inherit"
                        aria-label="home"
                        sx={{fontSize: 'large'}}
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        <HomeIcon sx={{fontSize: '2rem'}}/>
                    </IconButton>

                    {/* Center icon with circle outline */}
                    <Box sx={{marginBottom: '15px'}}>
                        <IconButton
                            color="inherit"
                            aria-label="add"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                margin: 'auto',
                                fontSize: 'large',
                                transform: 'translateY(-30%)',
                                backgroundColor: '#67C6E3',
                                borderRadius: '50%', // Creates a circular shape
                                width: 93,
                                height: 93,
                                '&:hover': {
                                    backgroundColor: '#4c85d7',
                                }
                            }}
                        >
                            <AddCircleOutlineIcon sx={{
                                fontSize: '5rem'
                            }}
                            onClick={()=>{
                                window.location.href = '/create-task';
                            }}/>
                        </IconButton>
                    </Box>

                    {/* Right icon */}
                    <IconButton
                        color="inherit"
                        aria-label="statistics"
                        sx={{fontSize: 'large'}}
                        onClick={() => {
                            window.location.href = '/leaderboard';
                        }}
                    >
                        <BarChartIcon sx={{fontSize: '2rem'}}/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;
